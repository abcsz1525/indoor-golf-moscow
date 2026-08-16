<?php
declare(strict_types=1);

require_once __DIR__ . '/_server-config.php';

function lead_storage_path(): string {
  $configured = server_secret('LEADS_STORAGE_PATH');
  if ($configured !== '') return $configured;

  $documentRoot = realpath((string)($_SERVER['DOCUMENT_ROOT'] ?? ''));
  if (!is_string($documentRoot) || $documentRoot === '') return '';

  return dirname($documentRoot, 2)
    . DIRECTORY_SEPARATOR . 'indoor-golf-private'
    . DIRECTORY_SEPARATOR . 'leads.ndjson';
}

function ensure_lead_storage(string $path): bool {
  $directory = dirname($path);
  if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
    error_log('lead storage: failed to create private directory');
    return false;
  }

  @chmod($directory, 0700);
  return true;
}

function store_lead(array $record): bool {
  $path = lead_storage_path();
  if ($path === '' || !ensure_lead_storage($path)) return false;

  $handle = fopen($path, 'c+');
  if ($handle === false) {
    error_log('lead storage: failed to open storage file');
    return false;
  }

  $ok = false;
  if (flock($handle, LOCK_EX)) {
    rewind($handle);
    $now = time();
    $kept = [];

    while (($line = fgets($handle)) !== false) {
      $existing = json_decode($line, true);
      if (!is_array($existing)) continue;
      $retentionUntil = strtotime((string)($existing['retention_until'] ?? ''));
      if ($retentionUntil !== false && $retentionUntil >= $now) {
        $kept[] = $existing;
      }
    }

    $kept[] = $record;
    rewind($handle);
    ftruncate($handle, 0);
    $ok = true;

    foreach ($kept as $item) {
      $encoded = json_encode($item, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
      if (!is_string($encoded) || fwrite($handle, $encoded . "\n") === false) {
        $ok = false;
        break;
      }
    }

    fflush($handle);
    flock($handle, LOCK_UN);
  }

  fclose($handle);
  @chmod($path, 0600);
  if (!$ok) error_log('lead storage: failed to persist lead');
  return $ok;
}

function load_leads(): array {
  $path = lead_storage_path();
  if ($path === '' || !is_file($path) || !is_readable($path)) return [];

  $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  if (!is_array($lines)) return [];

  $records = [];
  foreach ($lines as $line) {
    $record = json_decode($line, true);
    if (is_array($record)) $records[] = $record;
  }

  return array_reverse($records);
}

function delete_lead(string $id): bool {
  $path = lead_storage_path();
  if ($path === '' || !is_file($path)) return false;

  $handle = fopen($path, 'c+');
  if ($handle === false) return false;

  $deleted = false;
  if (flock($handle, LOCK_EX)) {
    rewind($handle);
    $kept = [];
    while (($line = fgets($handle)) !== false) {
      $record = json_decode($line, true);
      if (!is_array($record)) continue;
      if (hash_equals((string)($record['id'] ?? ''), $id)) {
        $deleted = true;
        continue;
      }
      $kept[] = $record;
    }

    rewind($handle);
    ftruncate($handle, 0);
    foreach ($kept as $record) {
      $encoded = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
      if (is_string($encoded)) fwrite($handle, $encoded . "\n");
    }
    fflush($handle);
    flock($handle, LOCK_UN);
  }

  fclose($handle);
  return $deleted;
}

