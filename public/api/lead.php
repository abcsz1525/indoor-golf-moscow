<?php
// Прокси заявок в Telegram. Токен хранится только на сервере —
// в клиентский код он не попадает, и api.telegram.org дёргает хостинг, а не браузер.
$BOT_TOKEN = '__PASTE_BOT_TOKEN__';
$CHAT_ID   = '__PASTE_CHAT_ID__';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo '{"ok":false,"error":"method"}';
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data) || empty($data['name']) || empty($data['phone'])) {
  http_response_code(400);
  echo '{"ok":false,"error":"bad_request"}';
  exit;
}

$name     = mb_substr(trim((string)$data['name']), 0, 100);
$phone    = mb_substr(trim((string)$data['phone']), 0, 30);
$interest = mb_substr(trim((string)($data['interest'] ?? '')), 0, 100);
$channel  = mb_substr(trim((string)($data['channel'] ?? '')), 0, 30);
$comment  = mb_substr(trim((string)($data['comment'] ?? '')), 0, 500);
$page     = mb_substr(trim((string)($data['page'] ?? '')), 0, 100);

$lines = ['🏌️ Новая заявка с сайта indoor-golf.ru', ''];
$lines[] = "👤 Имя: $name";
$lines[] = "📱 Телефон: $phone";
if ($interest !== '') $lines[] = "🎯 Интересует: $interest";
if ($channel !== '')  $lines[] = "💬 Способ связи: $channel";
if ($comment !== '')  $lines[] = "📝 Комментарий: $comment";
if ($page !== '')     $lines[] = "📄 Страница: $page";
$text = implode("\n", $lines);

if ($BOT_TOKEN === '__PASTE_BOT_TOKEN__') {
  http_response_code(500);
  echo '{"ok":false,"error":"not_configured"}';
  exit;
}

$ch = curl_init("https://api.telegram.org/bot$BOT_TOKEN/sendMessage");
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 10,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
  CURLOPT_POSTFIELDS => json_encode(['chat_id' => $CHAT_ID, 'text' => $text], JSON_UNESCAPED_UNICODE),
]);
curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($code === 200) {
  echo '{"ok":true}';
} else {
  http_response_code(502);
  echo '{"ok":false,"error":"telegram"}';
}
