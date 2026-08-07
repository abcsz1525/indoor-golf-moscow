<?php
declare(strict_types=1);

require_once __DIR__ . '/_server-config.php';

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

function send_telegram(string $botToken, string $chatId, string $text): bool {
  $ch = curl_init('https://api.telegram.org/bot' . rawurlencode($botToken) . '/sendMessage');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode([
      'chat_id' => $chatId,
      'text' => $text,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
  ]);
  $response = curl_exec($ch);
  $curlError = curl_error($ch);
  $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  $data = is_string($response) ? json_decode($response, true) : null;
  if ($httpCode === 200 && is_array($data) && !empty($data['ok'])) return true;

  error_log('yclients-webhook.php: Telegram delivery failed: ' . ($curlError !== '' ? $curlError : 'HTTP ' . $httpCode));
  return false;
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
  json_response(503, ['ok' => false, 'error' => 'service_unavailable']);
}

$providedKey = (string)($_GET['key'] ?? '');
if ($providedKey === '' || !hash_equals($webhookKey, $providedKey)) {
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

foreach ($events as $event) {
  if (!is_array($event)) continue;
  if (($event['resource'] ?? null) !== 'record') continue;
  if (!isset($event['company_id']) || (int)$event['company_id'] !== COMPANY_ID) continue;

  $status = $event['status'] ?? null;
  if (!in_array($status, ['create', 'delete'], true)) continue;

  $record = $event['data'] ?? null;
  if (!is_array($record) || empty($event['resource_id'])) continue;

  $client = is_array($record['client'] ?? null) ? $record['client'] : [];
  $name = clean_field($client['name'] ?? $record['client_name'] ?? '', 100);
  $phone = clean_field($client['phone'] ?? $record['client_phone'] ?? '', 30);
  $comment = clean_field($record['comment'] ?? '', 500, true);

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
  if ($name !== '') $lines[] = "👤 Имя: $name";
  if ($phone !== '') $lines[] = "📱 Телефон: $phone";
  if ($serviceTitles !== []) $lines[] = '🎯 Услуга: ' . implode(', ', $serviceTitles);
  if ($total > 0) $lines[] = '💰 Сумма: ' . format_money($total);
  $when = format_when($record['datetime'] ?? $record['date'] ?? '');
  if ($when !== '') $lines[] = "🕒 Когда: $when";
  if ($staff !== '') $lines[] = "🎾 Ресурс: $staff";
  if ($comment !== '') $lines[] = "💬 Комментарий: $comment";
  $lines[] = !empty($record['online']) ? '🌐 Источник: онлайн-запись' : '🏢 Источник: YClients';

  if (!send_telegram($botToken, $chatId, implode("\n", $lines))) {
    json_response(502, ['ok' => false, 'error' => 'delivery_failed']);
  }
  $sent++;
}

json_response(200, ['ok' => true, 'sent' => $sent]);
