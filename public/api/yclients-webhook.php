<?php
// Приёмник вебхуков YClients → пересылает уведомления о записях в Telegram.
// YClients дёргает этот файл при событиях с записями (создание/удаление).
// Токен бота хранится только на сервере (в git — плейсхолдер).
$BOT_TOKEN = '__PASTE_BOT_TOKEN__';
$CHAT_ID   = '-5229487803'; // группа «Indoor golf записи»

// Секрет в URL: вебхук настраивается как .../api/yclients-webhook.php?key=ЭТОТ_КЛЮЧ
// Если ключ не совпал — запрос отбрасываем (чтобы в чат не слали мусор).
$WEBHOOK_KEY = 'igm-yc-9f3a71';

// Наша компания в YClients — чужие события игнорируем.
$COMPANY_ID = 1466424;

header('Content-Type: application/json; charset=utf-8');

// YClients при настройке проверяет доступность URL обычным GET — отвечаем 200.
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  echo '{"ok":true,"service":"yclients-webhook"}';
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo '{"ok":false,"error":"method"}';
  exit;
}

// Проверка секретного ключа.
if (($_GET['key'] ?? '') !== $WEBHOOK_KEY) {
  http_response_code(403);
  echo '{"ok":false,"error":"forbidden"}';
  exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) {
  http_response_code(400);
  echo '{"ok":false,"error":"bad_json"}';
  exit;
}

// YClients может прислать одно событие (объект) или список событий (массив).
$events = isset($payload['resource']) || isset($payload['data']) ? [$payload] : $payload;

function money($v) {
  $n = (float)$v;
  return number_format($n, 0, '.', ' ') . ' ₽';
}

function fmt_when($s) {
  if (!$s) return '';
  $ts = strtotime((string)$s);
  if ($ts === false) return (string)$s;
  return date('d.m.Y H:i', $ts);
}

$sent = 0;
$errors = [];

foreach ($events as $event) {
  if (!is_array($event)) continue;

  // Интересуют только события по записям.
  $resource = $event['resource'] ?? 'record';
  if ($resource !== 'record') continue;

  // Чужая компания — пропускаем.
  $cid = $event['company_id'] ?? ($event['data']['company_id'] ?? null);
  if ($cid !== null && (int)$cid !== $COMPANY_ID) continue;

  $status = $event['status'] ?? 'create'; // create | update | delete
  // Шлём только про новые записи и отмены; update (смена статуса) — слишком шумно.
  if (!in_array($status, ['create', 'delete'], true)) continue;

  $rec = $event['data'] ?? $event;

  // Клиент.
  $client = $rec['client'] ?? [];
  $name  = trim((string)($client['name'] ?? $rec['client_name'] ?? ''));
  $phone = trim((string)($client['phone'] ?? $rec['client_phone'] ?? ''));

  // Услуги (может быть несколько).
  $serviceTitles = [];
  $total = 0;
  if (!empty($rec['services']) && is_array($rec['services'])) {
    foreach ($rec['services'] as $s) {
      $t = trim((string)($s['title'] ?? ''));
      if ($t !== '') $serviceTitles[] = $t;
      $total += (float)($s['cost'] ?? $s['price'] ?? 0);
    }
  }
  $servicesLine = implode(', ', $serviceTitles);

  // Когда.
  $when = fmt_when($rec['datetime'] ?? $rec['date'] ?? '');

  // Сотрудник / ресурс.
  $staff = '';
  if (!empty($rec['staff']) && is_array($rec['staff'])) {
    $staff = trim((string)($rec['staff']['name'] ?? ''));
  }

  $comment = trim((string)($rec['comment'] ?? ''));
  $isOnline = !empty($rec['online']);

  // Собираем сообщение.
  $head = $status === 'delete'
    ? '🔴 Отмена записи — YClients'
    : '🟢 Новая запись — YClients';

  $lines = [$head, ''];
  if ($name !== '')         $lines[] = "👤 Имя: $name";
  if ($phone !== '')        $lines[] = "📱 Телефон: $phone";
  if ($servicesLine !== '') $lines[] = "🎯 Услуга: $servicesLine";
  if ($total > 0)           $lines[] = "💰 Сумма: " . money($total);
  if ($when !== '')         $lines[] = "🕒 Когда: $when";
  if ($staff !== '')        $lines[] = "🎾 Ресурс: $staff";
  if ($comment !== '')      $lines[] = "💬 Комментарий: $comment";
  $lines[] = $isOnline ? "🌐 Источник: онлайн-запись" : "🏢 Источник: YClients";

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
  $tgResp = curl_exec($ch);
  $tgErr  = curl_error($ch);
  curl_close($ch);

  // Проверяем реальный ответ Telegram, а не молча считаем успехом.
  $tgData = is_string($tgResp) ? json_decode($tgResp, true) : null;
  if (is_array($tgData) && !empty($tgData['ok'])) {
    $sent++;
  } else {
    $errors[] = $tgErr !== '' ? $tgErr : ($tgData['description'] ?? 'unknown');
  }
}

// Всегда отвечаем 200, чтобы YClients не считал вебхук упавшим и не отключил его.
echo json_encode(['ok' => true, 'sent' => $sent, 'errors' => $errors], JSON_UNESCAPED_UNICODE);
