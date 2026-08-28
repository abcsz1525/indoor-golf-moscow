<?php
declare(strict_types=1);

require_once __DIR__ . '/_server-config.php';
require_once __DIR__ . '/_lead-storage.php';
require_once __DIR__ . '/_telegram.php';

const CURRENT_CONSENT_VERSION = '2026-08-11';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function json_response(int $status, array $payload): never {
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function clean_field(mixed $value, int $maxLength, bool $allowNewlines = false): string {
  $text = trim((string)$value);
  $text = preg_replace($allowNewlines ? '/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u' : '/[\x00-\x1F\x7F]+/u', ' ', $text) ?? '';
  return mb_substr($text, 0, $maxLength);
}

function lead_notice_text(array $record): string {
  // Контакты в уведомлении — решение владельца от 20.08.2026. Полная запись
  // с согласием по-прежнему хранится на российском сервере (152-ФЗ), карточка ниже.
  $lines = [
    '🏌️ Новая заявка с indoor-golf.ru',
    '',
    '👤 Имя: ' . $record['name'],
    '📞 Телефон: ' . $record['phone'],
  ];
  if (($record['email'] ?? '') !== '') $lines[] = '✉️ E-mail: ' . $record['email'];
  if ($record['interest'] !== '') $lines[] = '🎯 Интерес: ' . $record['interest'];
  if ($record['comment'] !== '') $lines[] = '💬 Комментарий: ' . $record['comment'];
  if ($record['page'] !== '') $lines[] = '📄 Страница: ' . $record['page'];
  $lines[] = '🕒 Получена: ' . date('d.m.Y H:i', strtotime($record['received_at']));
  $lines[] = '🔎 Карточка: https://indoor-golf.ru/api/leads-admin.php#' . rawurlencode($record['id']);

  return implode("\n", $lines);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Allow: POST');
  json_response(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 16_384) {
  json_response(413, ['ok' => false, 'error' => 'payload_too_large']);
}

$raw = file_get_contents('php://input');
$data = is_string($raw) ? json_decode($raw, true) : null;
if (!is_array($data)) {
  json_response(400, ['ok' => false, 'error' => 'invalid_json']);
}

if (!empty($data['website'])) {
  json_response(200, ['ok' => true]);
}

$consent = is_array($data['consent'] ?? null) ? $data['consent'] : [];
$consentAccepted = ($consent['accepted'] ?? null) === true;
$consentVersion = clean_field($consent['version'] ?? '', 30);
$consentClientAt = clean_field($consent['acceptedAt'] ?? '', 50);
if (!$consentAccepted || $consentVersion !== CURRENT_CONSENT_VERSION || strtotime($consentClientAt) === false) {
  json_response(422, ['ok' => false, 'error' => 'consent_required']);
}

$name = clean_field($data['name'] ?? '', 100);
$phone = clean_field($data['phone'] ?? '', 30);
$email = clean_field($data['email'] ?? '', 150);
$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
if (mb_strlen($name) < 2 || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 11) {
  json_response(422, ['ok' => false, 'error' => 'validation_failed']);
}
// Форма турнира требует адрес, форма на главной его не собирает: проверяем только присланный.
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(422, ['ok' => false, 'error' => 'invalid_email']);
}

$receivedAt = gmdate('c');
$record = [
  'id' => date('YmdHis') . '-' . bin2hex(random_bytes(4)),
  'received_at' => $receivedAt,
  'retention_until' => gmdate('c', time() + 90 * 86400),
  'name' => $name,
  'phone' => $phone,
  'email' => $email,
  'interest' => clean_field($data['interest'] ?? '', 100),
  'channel' => clean_field($data['channel'] ?? '', 30),
  'comment' => clean_field($data['comment'] ?? '', 500, true),
  'page' => clean_field($data['page'] ?? '', 100),
  'consent' => [
    'accepted' => true,
    'version' => $consentVersion,
    'client_at' => $consentClientAt,
    'server_at' => $receivedAt,
  ],
  'technical' => [
    'ip' => clean_field($_SERVER['REMOTE_ADDR'] ?? '', 64),
    'user_agent' => clean_field($_SERVER['HTTP_USER_AGENT'] ?? '', 300),
  ],
];

if (!store_lead($record)) {
  json_response(503, ['ok' => false, 'error' => 'storage_unavailable']);
}

$botToken = server_secret('TG_BOT_TOKEN');
$chatId = server_secret('TG_CHAT_ID');

// Клиент получает ответ сразу: заявка уже сохранена, и ждать Telegram он не должен.
// Отправка идёт после закрытия соединения, поэтому попытки ничего не тормозят.
$payload = json_encode(['ok' => true, 'leadId' => $record['id']], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
http_response_code(200);
// Точная длина тела позволяет браузеру закончить запрос, не дожидаясь конца скрипта:
// на этом хостинге (cgi-fcgi) функции fastcgi_finish_request нет.
header('Content-Length: ' . strlen((string)$payload));
header('Connection: close');
echo $payload;
$released = release_client();
$attempts = TELEGRAM_SEND_ATTEMPTS;

if (!telegram_deliver($botToken, $chatId, lead_notice_text($record), 'lead', $record['id'], $attempts)) {
  error_log('lead.php: заявка ' . $record['id'] . ' сохранена, уведомление отложено в очередь');
}

// Заодно досылаем всё, что не ушло раньше.
telegram_flush_queue($botToken, $chatId, $released ? 10 : 2);
exit;
