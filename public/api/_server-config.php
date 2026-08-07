<?php
declare(strict_types=1);

/**
 * Возвращает серверный секрет. На VPS приоритет имеют переменные окружения.
 * На виртуальном хостинге REG.RU используется файл вне web-root:
 * /var/www/<user>/data/indoor-golf-secrets.php
 */
function server_secret(string $name): string {
  $environmentValue = getenv($name);
  if (is_string($environmentValue) && trim($environmentValue) !== '') {
    return trim($environmentValue);
  }

  static $fileConfig = null;
  if ($fileConfig === null) {
    $fileConfig = [];
    $documentRoot = realpath((string)($_SERVER['DOCUMENT_ROOT'] ?? ''));

    if (is_string($documentRoot) && $documentRoot !== '') {
      $configPath = dirname($documentRoot, 2) . DIRECTORY_SEPARATOR . 'indoor-golf-secrets.php';
      if (is_file($configPath) && is_readable($configPath)) {
        $loaded = require $configPath;
        if (is_array($loaded)) {
          $fileConfig = $loaded;
        } else {
          error_log('Indoor Golf server config must return an array');
        }
      }
    }
  }

  $fileValue = $fileConfig[$name] ?? '';
  return is_string($fileValue) ? trim($fileValue) : '';
}

