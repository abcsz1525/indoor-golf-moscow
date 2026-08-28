<?php
declare(strict_types=1);

require_once __DIR__ . '/_server-config.php';
require_once __DIR__ . '/_telegram.php';

/**
 * Досылка отложенных уведомлений. Вызывается планировщиком хостинга,
 * чтобы уведомление не ждало следующей заявки, если канал до Telegram
 * оборвался в момент отправки.
 *
 * Пример строки для планировщика (раз в 5 минут):
 * curl -s -u indoor-golf:<LEADS_ADMIN_PASSWORD> https://indoor-golf.ru/api/notify-retry.php
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

function json_response(int $status, array $payload): never {
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function retry_credentials(): array {
  $user = (string)($_SERVER['PHP_AUTH_USER'] ?? '');
  $password = (string)($_SERVER['PHP_AUTH_PW'] ?? '');
  if ($user !== '' || $password !== '') return [$user, $password];

  $authorization = (string)(
    $_SERVER['HTTP_AUTHORIZATION']
    ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
    ?? ''
  );
  if ($authorization === '' && function_exists('getallheaders')) {
    foreach (getallheaders() as $name => $value) {
      if (strcasecmp((string)$name, 'Authorization') === 0) {
        $authorization = (string)$value;
        break;
      }
    }
  }
  if (str_starts_with($authorization, 'Basic ')) {
    $decoded = base64_decode(substr($authorization, 6), true);
    if (is_string($decoded) && str_contains($decoded, ':')) {
      return explode(':', $decoded, 2);
    }
  }

  return ['', ''];
}

$adminPassword = server_secret('LEADS_ADMIN_PASSWORD');
[$providedUser, $providedPassword] = retry_credentials();
if ($adminPassword === '' || $providedUser !== 'indoor-golf' || !hash_equals($adminPassword, $providedPassword)) {
  header('WWW-Authenticate: Basic realm="Indoor Golf retry", charset="UTF-8"');
  json_response($adminPassword === '' ? 503 : 401, ['ok' => false, 'error' => 'unauthorized']);
}

$botToken = server_secret('TG_BOT_TOKEN');
$chatId = server_secret('TG_CHAT_ID');
if ($botToken === '' || $chatId === '') {
  json_response(503, ['ok' => false, 'error' => 'telegram_not_configured', 'pending' => telegram_pending_count()]);
}

$result = telegram_flush_queue($botToken, $chatId, 25);

json_response(200, [
  'ok' => true,
  'sent' => $result['sent'],
  'pending' => $result['left'],
]);
