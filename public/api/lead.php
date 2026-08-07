<?php
declare(strict_types=1);

require_once __DIR__ . '/_server-config.php';

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

// Honeypot: настоящая форма оставляет поле пустым, простые боты обычно заполняют.
if (!empty($data['website'])) {
  json_response(200, ['ok' => true]);
}

$name = clean_field($data['name'] ?? '', 100);
$phone = clean_field($data['phone'] ?? '', 30);
$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
if (mb_strlen($name) < 2 || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 11) {
  json_response(422, ['ok' => false, 'error' => 'validation_failed']);
}

$botToken = server_secret('TG_BOT_TOKEN');
$chatId = server_secret('TG_CHAT_ID');
if ($botToken === '' || $chatId === '') {
  error_log('lead.php: Telegram environment is not configured');
  json_response(503, ['ok' => false, 'error' => 'service_unavailable']);
}

$interest = clean_field($data['interest'] ?? '', 100);
$channel = clean_field($data['channel'] ?? '', 30);
$comment = clean_field($data['comment'] ?? '', 500, true);
$page = clean_field($data['page'] ?? '', 100);

$lines = ['🏌️ Новая заявка с сайта indoor-golf.ru', ''];
$lines[] = "👤 Имя: $name";
$lines[] = "📱 Телефон: $phone";
if ($interest !== '') $lines[] = "🎯 Интересует: $interest";
if ($channel !== '') $lines[] = "💬 Способ связи: $channel";
if ($comment !== '') $lines[] = "📝 Комментарий: $comment";
if ($page !== '') $lines[] = "📄 Страница: $page";

$ch = curl_init('https://api.telegram.org/bot' . rawurlencode($botToken) . '/sendMessage');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CONNECTTIMEOUT => 5,
  CURLOPT_TIMEOUT => 10,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
  CURLOPT_POSTFIELDS => json_encode([
    'chat_id' => $chatId,
    'text' => implode("\n", $lines),
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
]);

$telegramResponse = curl_exec($ch);
$curlError = curl_error($ch);
$httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$telegramData = is_string($telegramResponse) ? json_decode($telegramResponse, true) : null;
if ($httpCode !== 200 || !is_array($telegramData) || empty($telegramData['ok'])) {
  error_log('lead.php: Telegram delivery failed: ' . ($curlError !== '' ? $curlError : 'HTTP ' . $httpCode));
  json_response(502, ['ok' => false, 'error' => 'delivery_failed']);
}

json_response(200, ['ok' => true]);
