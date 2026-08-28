<?php
declare(strict_types=1);

require_once __DIR__ . '/_server-config.php';
require_once __DIR__ . '/_lead-storage.php';

header('Content-Type: text/html; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store, private');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'");

function admin_credentials(): array {
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
[$providedUser, $providedPassword] = admin_credentials();
if ($adminPassword === '' || $providedUser !== 'indoor-golf' || !hash_equals($adminPassword, $providedPassword)) {
  header('WWW-Authenticate: Basic realm="Indoor Golf leads", charset="UTF-8"');
  http_response_code($adminPassword === '' ? 503 : 401);
  echo $adminPassword === '' ? 'Панель заявок не настроена.' : 'Требуется авторизация.';
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = preg_replace('/[^0-9A-Za-z-]/', '', (string)($_POST['id'] ?? '')) ?? '';
  $csrf = (string)($_POST['csrf'] ?? '');
  $expected = hash_hmac('sha256', $id, $adminPassword);
  if ($id === '' || !hash_equals($expected, $csrf)) {
    http_response_code(400);
    echo 'Некорректный запрос.';
    exit;
  }
  delete_lead($id);
  header('Location: /api/leads-admin.php', true, 303);
  exit;
}

function h(mixed $value): string {
  return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$records = array_slice(load_leads(), 0, 200);
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Заявки Indoor Golf</title>
  <style>
    body{margin:0;background:#f5f5f3;color:#181818;font:15px/1.5 system-ui,sans-serif}main{max-width:980px;margin:auto;padding:28px 18px 60px}h1{font-size:28px;margin:0 0 8px}.note{color:#666;margin:0 0 24px}.card{background:#fff;border:1px solid #ddd;padding:18px;margin:0 0 14px}.top{display:flex;gap:12px;justify-content:space-between;align-items:flex-start}.id{font:12px ui-monospace,monospace;color:#777}.name{font-size:20px;font-weight:700}.grid{display:grid;grid-template-columns:140px 1fr;gap:6px 14px;margin-top:14px}.label{color:#777}.comment{white-space:pre-wrap}.delete{margin-top:16px;border:1px solid #b42318;background:#fff;color:#b42318;padding:7px 10px;cursor:pointer}@media(max-width:620px){.grid{grid-template-columns:1fr}.label{margin-top:7px}}
  </style>
</head>
<body><main>
  <h1>Заявки Indoor Golf</h1>
  <p class="note">Контактные данные хранятся на сервере клуба. Показаны последние 200 заявок.</p>
  <?php if ($records === []): ?><p>Заявок пока нет.</p><?php endif; ?>
  <?php foreach ($records as $record): $id = (string)($record['id'] ?? ''); ?>
    <article class="card" id="<?= h($id) ?>">
      <div class="top"><div><div class="name"><?= h($record['name'] ?? '') ?></div><a href="tel:<?= h($record['phone'] ?? '') ?>"><?= h($record['phone'] ?? '') ?></a></div><div class="id"><?= h($id) ?></div></div>
      <div class="grid">
        <div class="label">Получена</div><div><?= h($record['received_at'] ?? '') ?></div>
        <div class="label">E-mail</div><div><?php $email = (string)($record['email'] ?? ''); ?><?php if ($email !== ''): ?><a href="mailto:<?= h($email) ?>"><?= h($email) ?></a><?php else: ?>—<?php endif; ?></div>
        <div class="label">Интерес</div><div><?= h($record['interest'] ?? '') ?></div>
        <div class="label">Канал</div><div><?= h($record['channel'] ?? '') ?></div>
        <div class="label">Страница</div><div><?= h($record['page'] ?? '') ?></div>
        <div class="label">Комментарий</div><div class="comment"><?= h($record['comment'] ?? '') ?></div>
        <div class="label">Согласие</div><div>версия <?= h($record['consent']['version'] ?? '') ?> · <?= h($record['consent']['server_at'] ?? '') ?></div>
        <div class="label">Удалить после</div><div><?= h($record['retention_until'] ?? '') ?></div>
      </div>
      <form method="post">
        <input type="hidden" name="id" value="<?= h($id) ?>">
        <input type="hidden" name="csrf" value="<?= h(hash_hmac('sha256', $id, $adminPassword)) ?>">
        <button class="delete" type="submit">Удалить заявку</button>
      </form>
    </article>
  <?php endforeach; ?>
</main></body></html>
