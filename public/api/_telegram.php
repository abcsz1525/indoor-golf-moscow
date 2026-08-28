<?php
declare(strict_types=1);

require_once __DIR__ . '/_server-config.php';

/**
 * Доставка уведомлений в Telegram.
 *
 * Канал до api.telegram.org с российского хостинга нестабилен: 27.08.2026 из трёх
 * заявок одна потерялась при единственной попытке отправки. Поэтому здесь три
 * попытки подряд, а если не прошла ни одна — уведомление уходит в очередь на диск
 * и досылается следующим запросом или планировщиком. Молча терять уведомление нельзя:
 * клиент видит «заявка отправлена», а клуб о ней не узнаёт.
 */

const TELEGRAM_SEND_ATTEMPTS = 3;
const TELEGRAM_QUEUE_LIMIT = 200;

function telegram_queue_path(): string {
  $configured = server_secret('TELEGRAM_QUEUE_PATH');
  if ($configured !== '') return $configured;

  $documentRoot = realpath((string)($_SERVER['DOCUMENT_ROOT'] ?? ''));
  if (!is_string($documentRoot) || $documentRoot === '') return '';

  return dirname($documentRoot, 2)
    . DIRECTORY_SEPARATOR . 'indoor-golf-private'
    . DIRECTORY_SEPARATOR . 'telegram-queue.ndjson';
}

function ensure_telegram_queue(string $path): bool {
  $directory = dirname($path);
  if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
    error_log('telegram queue: failed to create private directory');
    return false;
  }

  @chmod($directory, 0700);
  return true;
}

/** Одна попытка отправки. Возвращает ['ok' => bool, 'error' => string]. */
function telegram_post(string $botToken, string $chatId, string $text): array {
  $ch = curl_init('https://api.telegram.org/bot' . rawurlencode($botToken) . '/sendMessage');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode([
      'chat_id' => $chatId,
      'text' => $text,
      'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
  ]);

  $response = curl_exec($ch);
  $curlError = curl_error($ch);
  $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);

  $data = is_string($response) ? json_decode($response, true) : null;
  if ($httpCode === 200 && is_array($data) && !empty($data['ok'])) {
    return ['ok' => true, 'error' => ''];
  }

  $reason = $curlError !== ''
    ? 'curl: ' . $curlError
    : 'HTTP ' . $httpCode . ' ' . (is_array($data) ? (string)($data['description'] ?? '') : 'нет ответа');

  return ['ok' => false, 'error' => trim($reason)];
}

/** Несколько попыток с нарастающей паузой. */
function telegram_send(string $botToken, string $chatId, string $text, int $attempts = TELEGRAM_SEND_ATTEMPTS): array {
  $result = ['ok' => false, 'error' => 'не выполнено ни одной попытки'];

  for ($attempt = 1; $attempt <= max(1, $attempts); $attempt++) {
    $result = telegram_post($botToken, $chatId, $text);
    if ($result['ok']) return $result;

    error_log(sprintf('telegram: попытка %d из %d не удалась: %s', $attempt, $attempts, $result['error']));
    if ($attempt < $attempts) usleep($attempt * 400_000);
  }

  return $result;
}

/** Кладёт недоставленное уведомление в очередь. */
function telegram_enqueue(string $text, string $kind, string $reference, string $lastError = ''): bool {
  $path = telegram_queue_path();
  if ($path === '' || !ensure_telegram_queue($path)) return false;

  $item = [
    'queued_at' => gmdate('c'),
    'kind' => $kind,
    'reference' => $reference,
    'attempts' => TELEGRAM_SEND_ATTEMPTS,
    'last_error' => $lastError,
    'text' => $text,
  ];

  $encoded = json_encode($item, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  if (!is_string($encoded)) return false;

  $handle = fopen($path, 'a');
  if ($handle === false) {
    error_log('telegram queue: failed to open queue file');
    return false;
  }

  $ok = false;
  if (flock($handle, LOCK_EX)) {
    $ok = fwrite($handle, $encoded . "\n") !== false;
    fflush($handle);
    flock($handle, LOCK_UN);
  }

  fclose($handle);
  @chmod($path, 0600);

  if ($ok) {
    error_log('telegram queue: уведомление отложено (' . $kind . ' ' . $reference . ')');
  }

  return $ok;
}

function telegram_queue_items(): array {
  $path = telegram_queue_path();
  if ($path === '' || !is_file($path) || !is_readable($path)) return [];

  $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  if (!is_array($lines)) return [];

  $items = [];
  foreach ($lines as $line) {
    $item = json_decode($line, true);
    if (is_array($item) && isset($item['text'])) $items[] = $item;
  }

  return $items;
}

function telegram_pending_count(): int {
  return count(telegram_queue_items());
}

/**
 * Пытается доставить отложенные уведомления. Успешные удаляются из очереди,
 * неудачные остаются на следующий заход.
 */
function telegram_flush_queue(string $botToken, string $chatId, int $maxItems = 10): array {
  $path = telegram_queue_path();
  if ($path === '' || !is_file($path)) return ['sent' => 0, 'left' => 0];
  if ($botToken === '' || $chatId === '') return ['sent' => 0, 'left' => telegram_pending_count()];

  $handle = fopen($path, 'c+');
  if ($handle === false) return ['sent' => 0, 'left' => 0];

  $sent = 0;
  $left = 0;

  if (flock($handle, LOCK_EX)) {
    rewind($handle);
    $items = [];
    while (($line = fgets($handle)) !== false) {
      $item = json_decode($line, true);
      if (is_array($item) && isset($item['text'])) $items[] = $item;
    }

    $processed = 0;
    $kept = [];
    foreach ($items as $item) {
      if ($processed >= $maxItems) {
        $kept[] = $item;
        continue;
      }

      $processed++;
      $result = telegram_send($botToken, $chatId, (string)$item['text'], 1);
      if ($result['ok']) {
        $sent++;
        continue;
      }

      $item['attempts'] = (int)($item['attempts'] ?? 0) + 1;
      $item['last_error'] = $result['error'];
      $kept[] = $item;
    }

    if (count($kept) > TELEGRAM_QUEUE_LIMIT) {
      $kept = array_slice($kept, -TELEGRAM_QUEUE_LIMIT);
    }

    rewind($handle);
    ftruncate($handle, 0);
    foreach ($kept as $item) {
      $encoded = json_encode($item, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
      if (is_string($encoded)) fwrite($handle, $encoded . "\n");
    }

    fflush($handle);
    flock($handle, LOCK_UN);
    $left = count($kept);
  }

  fclose($handle);
  @chmod($path, 0600);

  return ['sent' => $sent, 'left' => $left];
}

/**
 * Основная точка входа: доставить сейчас, а при неудаче — сохранить в очередь.
 * Возвращает true, только если уведомление действительно ушло в Telegram.
 */
function telegram_deliver(
  string $botToken,
  string $chatId,
  string $text,
  string $kind,
  string $reference,
  int $attempts = TELEGRAM_SEND_ATTEMPTS
): bool {
  if ($botToken === '' || $chatId === '') {
    telegram_enqueue($text, $kind, $reference, 'на сервере не заданы TG_BOT_TOKEN или TG_CHAT_ID');
    return false;
  }

  $result = telegram_send($botToken, $chatId, $text, $attempts);
  if ($result['ok']) return true;

  telegram_enqueue($text, $kind, $reference, $result['error']);
  return false;
}

/**
 * Отдаёт ответ клиенту и продолжает работу в фоне, чтобы он не ждал Telegram.
 * Возвращает false, если соединение закрыть не удалось: тогда вызывающий код
 * обязан ограничиться одной попыткой, иначе форма будет висеть у клиента.
 */
function release_client(): bool {
  // Клиент может отключиться сразу после получения тела ответа — работа по доставке
  // уведомления обязана продолжиться.
  ignore_user_abort(true);

  if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
    return true;
  }

  if (function_exists('litespeed_finish_request')) {
    litespeed_finish_request();
    return true;
  }

  @ob_end_flush();
  @flush();
  return false;
}
