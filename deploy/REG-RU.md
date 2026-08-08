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

Скопируйте структуру из `deploy/indoor-golf-secrets.php.example`, замените все три значения и установите права `600`. Старый YClients webhook key использовать нельзя.

Этот файл нельзя помещать в `www`, `indoor-golf.ru`, Git или архив сайта.

## 3. Сделайте резервную копию

Перед заменой файлов создайте архив текущей корневой папки сайта через ISPmanager. Не удаляйте каталог `webstat`, если он присутствует. Резервная копия позволит быстро откатить публикацию.

## 4. Загрузите сайт

1. ISPmanager → «Сайты» → `indoor-golf.ru` → «Файлы сайта».
2. Загрузите `indoor-golf-reg-ru.zip` в корневую папку сайта.
3. Извлеките архив непосредственно в корень, а не во вложенную директорию.
4. Убедитесь, что рядом с `index.html` находятся `.htaccess`, `404.html`, `assets/` и `api/`.
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
- тестовая заявка приходит в Telegram.

После этого замените URL webhook в YClients на:

```text
https://indoor-golf.ru/api/yclients-webhook.php?key=<НОВЫЙ_YCLIENTS_WEBHOOK_KEY>
```

## Откат

Если проверка не проходит, восстановите архив из шага 3. Файл `indoor-golf-secrets.php` находится вне сайта и при откате не затрагивается.
