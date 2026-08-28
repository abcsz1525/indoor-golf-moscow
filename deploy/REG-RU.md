# Публикация на REG.RU «Хостинг сайтов» / ISPmanager

Production: `https://indoor-golf.ru`  
Корневая папка обычно выглядит как `/var/www/u1234567/data/www/indoor-golf.ru`.

## 1. Соберите архив

На компьютере из корня проекта:

```bash
npm ci
npm run check
npm audit --omit=dev
npm run package:reg-ru
```

Для загрузки будут созданы `artifacts/indoor-golf-reg-ru.zip` и резервный вариант `artifacts/indoor-golf-reg-ru.tar.gz`. Внутри архивов лежит содержимое `dist/`, включая скрытый `.htaccess`; лишней папки `dist` внутри нет.

## 2. Подготовьте секреты вне сайта

В ISPmanager откройте «Менеджер файлов». Если сайт находится в:

```text
/var/www/u1234567/data/www/indoor-golf.ru
```

создайте файл:

```text
/var/www/u1234567/data/indoor-golf-secrets.php
```

Скопируйте структуру из `deploy/indoor-golf-secrets.php.example`, замените все четыре значения и установите права `600`. `LEADS_ADMIN_PASSWORD` должен быть отдельным длинным случайным паролем. Старый YClients webhook key использовать нельзя.

Этот файл нельзя помещать в `www`, `indoor-golf.ru`, Git или архив сайта.

## 3. Сделайте резервную копию

Перед заменой файлов создайте архив текущей корневой папки сайта через ISPmanager. Не удаляйте каталог `webstat`, если он присутствует. Резервная копия позволит быстро откатить публикацию.

## 4. Загрузите сайт

1. ISPmanager → «Сайты» → `indoor-golf.ru` → «Файлы сайта».
2. Загрузите `indoor-golf-reg-ru.zip` в корневую папку сайта.
3. Извлеките архив непосредственно в корень, а не во вложенную директорию.
4. Убедитесь, что рядом с `index.html` находятся `.htaccess`, `404.html`, `assets/` и `api/`. В `api/` должно быть семь файлов: `lead.php`, `leads-admin.php`, `notify-retry.php`, `yclients-webhook.php`, `_lead-storage.php`, `_server-config.php`, `_telegram.php`.
5. Для файлов должны подойти права `644`, для каталогов — `755`.

PHP на текущем production уже исполняется. В настройках сайта выберите PHP 8.2 или новее в режиме FastCGI; нужны расширения `curl` и `mbstring`. Если после загрузки PHP начнёт скачиваться или отображаться текстом, сначала проверьте эти настройки.

## 5. Проверка после публикации

```bash
curl -I https://indoor-golf.ru/
curl -I https://indoor-golf.ru/privacy
curl -I https://indoor-golf.ru/not-a-real-page
curl https://indoor-golf.ru/api/yclients-webhook.php
```

Ожидается:

- главная и `/privacy` — HTTP 200;
- неизвестный URL — HTTP 404;
- webhook health check — `{"ok":true,"service":"yclients-webhook"}`;
- прямой `/api/_server-config.php` недоступен;
- тестовая заявка приходит в Telegram без имени, телефона и комментария;
- `https://indoor-golf.ru/api/leads-admin.php` запрашивает логин `indoor-golf` и пароль `LEADS_ADMIN_PASSWORD`, после чего показывает полную заявку;
- в `/var/www/<логин>/data/indoor-golf-private/leads.ndjson` создаётся приватный журнал заявок и согласий с правами `600`.

После этого замените URL webhook в YClients на:

```text
https://indoor-golf.ru/api/yclients-webhook.php?key=<НОВЫЙ_YCLIENTS_WEBHOOK_KEY>
```

## Досылка уведомлений

С российского хостинга канал до `api.telegram.org` рвётся: 27.08.2026 из трёх заявок одна
потерялась на единственной попытке отправки, клиент при этом увидел «заявка отправлена».
Теперь отправка идёт в три попытки, а недоставленное складывается в очередь
`/var/www/<логин>/data/indoor-golf-private/telegram-queue.ndjson` и досылается.

Очередь разбирается сама при следующей заявке или событии YClients. Чтобы уведомление
не ждало этого события, добавьте задачу в планировщик ISPmanager — раз в 5 минут:

```bash
curl -s -u indoor-golf:<LEADS_ADMIN_PASSWORD> https://indoor-golf.ru/api/notify-retry.php
```

Ответ `{"ok":true,"sent":N,"pending":M}`: `sent` — досланные, `pending` — оставшиеся в очереди.
Если `pending` держится больше нуля дольше получаса, канал до Telegram недоступен целиком —
смотрите причину в `error_log` и в поле `last_error` внутри очереди.

Входящие обращения YClients пишутся в `indoor-golf-private/yclients-webhook.log`: там видно,
дёргал ли сервис вебхук вообще, и по какой причине событие было пропущено (`company_id`,
`status`, отсутствие ключа). Без этого журнала молчание YClients неотличимо от исправной работы.

## Откат

Если проверка не проходит, восстановите архив из шага 3. Файл `indoor-golf-secrets.php` находится вне сайта и при откате не затрагивается.
