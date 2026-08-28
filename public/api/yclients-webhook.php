<?php
declare(strict_types=1);

require_once __DIR__ . '/_server-config.php';
require_once __DIR__ . '/_telegram.php';

const COMPANY_ID = 1466424;

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

function format_money(mixed $value): string {
  return number_format((float)$value, 0, '.', ' ') . ' ₽';
}

function format_when(mixed $value): string {
  if (!$value) return '';
  $timestamp = strtotime((string)$value);
  return $timestamp === false ? clean_field($value, 50) : date('d.m.Y H:i', $timestamp);
}

/**
 * Журнал входящих обращений. Без него молчание YClients неотличимо от исправной
 * работы: 26.08.2026 две записи не дошли до Telegram, и по логам сервера нельзя
 * было понять, вызывал ли YClients вебхук вообще.
 */
function yclients_log(string $message): void {
  $documentRoot = realpath((string)($_SERVER['DOCUMENT_ROOT'] ?? ''));
  if (!is_string($documentRoot) || $documentRoot === '') return;

  $directory = dirname($documentRoot, 2) . DIRECTORY_SEPARATOR . 'indoor-golf-private';
  if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) return;
  @chmod($directory, 0700);

  $path = $directory . DIRECTORY_SEPARATOR . 'yclients-webhook.log';
  $line = sprintf(
    "%s\t%s\t%s\t%s\n",
    gmdate('c'),
    clean_field($_SERVER['REQUEST_METHOD'] ?? '', 10),
    clean_field($_SERVER['REMOTE_ADDR'] ?? '', 64),
    $message
  );

  @file_put_contents($path, $line, FILE_APPEND | LOCK_EX);
  @chmod($path, 0600);
}

$botToken = server_secret('TG_BOT_TOKEN');
$chatId = server_secret('TG_CHAT_ID');
$webhookKey = server_secret('YCLIENTS_WEBHOOK_KEY');
$configured = $botToken !== '' && $chatId !== '' && $webhookKey !== '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  json_response($configured ? 200 : 503, [
    'ok' => $configured,
    'service' => 'yclients-webhook',
  ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Allow: GET, POST');
  json_response(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

if (!$configured) {
  error_log('yclients-webhook.php: server environment is not configured');
  yclients_log('ОТКАЗ: сервер не сконфигурирован');
  json_response(503, ['ok' => false, 'error' => 'service_unavailable']);
}

$providedKey = (string)($_GET['key'] ?? '');
if ($providedKey === '' || !hash_equals($webhookKey, $providedKey)) {
  yclients_log($providedKey === '' ? 'ОТКАЗ 403: запрос без ключа' : 'ОТКАЗ 403: неверный ключ');
  json_response(403, ['ok' => false, 'error' => 'forbidden']);
}

$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 1_048_576) {
  json_response(413, ['ok' => false, 'error' => 'payload_too_large']);
}

$raw = file_get_contents('php://input');
$payload = is_string($raw) ? json_decode($raw, true) : null;
if (!is_array($payload)) {
  json_response(400, ['ok' => false, 'error' => 'invalid_json']);
}

$events = isset($payload['resource']) || isset($payload['data']) ? [$payload] : $payload;
$sent = 0;
$queued = 0;
$skipped = 0;
yclients_log('ПРИНЯТО: событий ' . (is_array($events) ? count($events) : 0));

foreach ($events as $event) {
  if (!is_array($event)) { $skipped++; yclients_log('ПРОПУЩЕНО: событие не является объектом'); continue; }
  if (($event['resource'] ?? null) !== 'record') {
    $skipped++;
    yclients_log('ПРОПУЩЕНО: resource=' . clean_field($event['resource'] ?? 'нет', 40));
    continue;
  }
  if (!isset($event['company_id']) || (int)$event['company_id'] !== COMPANY_ID) {
    $skipped++;
    yclients_log('ПРОПУЩЕНО: company_id=' . clean_field($event['company_id'] ?? 'нет', 40) . ', ожидался ' . COMPANY_ID);
    continue;
  }

  $status = $event['status'] ?? null;
  if (!in_array($status, ['create', 'delete'], true)) {
    $skipped++;
    yclients_log('ПРОПУЩЕНО: status=' . clean_field($status ?? 'нет', 40));
    continue;
  }

  $record = $event['data'] ?? null;
  if (!is_array($record) || empty($event['resource_id'])) {
    $skipped++;
    yclients_log('ПРОПУЩЕНО: пустые data или resource_id');
    continue;
  }

  $serviceTitles = [];
  $total = 0.0;
  if (is_array($record['services'] ?? null)) {
    foreach ($record['services'] as $service) {
      if (!is_array($service)) continue;
      $title = clean_field($service['title'] ?? '', 100);
      if ($title !== '') $serviceTitles[] = $title;
      $total += (float)($service['cost'] ?? $service['price'] ?? 0);
    }
  }

  $staff = '';
  if (is_array($record['staff'] ?? null)) {
    $staff = clean_field($record['staff']['name'] ?? '', 100);
  }

  $lines = [$status === 'delete' ? '🔴 Отмена записи — YClients' : '🟢 Новая запись — YClients', ''];
  $lines[] = '🔐 Контактные данные доступны только в YClients и не переданы в Telegram.';
  $lines[] = '🆔 Запись: ' . clean_field($event['resource_id'], 100);
  if ($serviceTitles !== []) $lines[] = '🎯 Услуга: ' . implode(', ', $serviceTitles);
  if ($total > 0) $lines[] = '💰 Сумма: ' . format_money($total);
  $when = format_when($record['datetime'] ?? $record['date'] ?? '');
  if ($when !== '') $lines[] = "🕒 Когда: $when";
  if ($staff !== '') $lines[] = "🎾 Ресурс: $staff";
  $lines[] = !empty($record['online']) ? '🌐 Источник: онлайн-запись' : '🏢 Источник: YClients';

  $reference = clean_field($event['resource_id'], 100);
  if (telegram_deliver($botToken, $chatId, implode("\n", $lines), 'yclients', $reference, 1)) {
    $sent++;
    yclients_log('ОТПРАВЛЕНО: запись ' . $reference);
  } else {
    $queued++;
    yclients_log('ОТЛОЖЕНО В ОЧЕРЕДЬ: запись ' . $reference);
  }
}

// Досылаем всё, что не ушло раньше, и отвечаем 200: ответственность за доставку
// теперь на нас, повторная присылка события от YClients создала бы дубль.
telegram_flush_queue($botToken, $chatId, 3);

json_response(200, ['ok' => true, 'sent' => $sent, 'queued' => $queued, 'skipped' => $skipped]);
