# Indoor Golf Moscow

Маркетинговый сайт клуба Indoor Golf Moscow в Лужниках. Основной интерфейс собран на React 19, TypeScript и Vite. Заявки обрабатываются PHP-endpoint и отправляются в Telegram; интеграция YClients доступна как отключаемый внешний виджет.

## Локальная разработка

Требования: Node.js 22 и npm.

```bash
npm ci
npm run dev
```

Vite не исполняет PHP. В локальном dev/preview формы должны показать понятную ошибку отправки, если рядом не запущен PHP-сервер. Это ожидаемое fail-closed поведение: интерфейс не сообщает об успехе без подтверждения backend.

## Проверка

```bash
npm run check
```

Команда последовательно запускает lint, восемь регрессионных тестов, TypeScript-проверку, production build и генерацию route-specific HTML. Подробности находятся в [TESTING.md](TESTING.md).

## Сборка

```bash
npm run build
```

Результат появляется в `dist/`. Postbuild создаёт отдельные HTML-файлы для `/about`, `/tech`, `/gallery`, `/services`, `/events`, `/contacts`, `/privacy` и 404. Это даёт поисковым роботам уникальные title, description, canonical и Open Graph metadata до выполнения JavaScript.

## Production

Сайт требует nginx и PHP-FPM. Статический Vercel deployment не поддерживается: он либо сломает PHP API, либо может выдать PHP-файлы как текст. Пример конфигурации находится в [deploy/nginx.conf.example](deploy/nginx.conf.example).

Секреты задаются только в окружении PHP-FPM:

```ini
env[TG_BOT_TOKEN] = "..."
env[TG_CHAT_ID] = "..."
env[YCLIENTS_WEBHOOK_KEY] = "новый-длинный-случайный-секрет"
```

Никогда не добавляйте эти значения в `.env` Vite и не используйте префикс `VITE_`. После изменения PHP-FPM pool перезапустите PHP-FPM и проверьте endpoints.

YClients webhook настраивается на адрес:

```text
https://indoor-golf.ru/api/yclients-webhook.php?key=<YCLIENTS_WEBHOOK_KEY>
```

Старый опубликованный ключ нельзя использовать повторно. После deployment задайте новый секрет в PHP-FPM и одновременно замените URL в YClients.

## Онлайн-запись YClients

Iframe по умолчанию выключен, потому что текущая форма YClients возвращает 403 для части запросов. Основные CTA открывают надёжную форму обратного звонка.

После исправления прав формы №1632762 в кабинете YClients проверьте полный сценарий на desktop и mobile, затем задайте при сборке:

```bash
VITE_YCLIENTS_EMBED_ENABLED=true npm run build
```

Это публичный feature flag, в нём нет секрета.

## Перед публикацией

1. Выполнить `npm ci && npm run check && npm audit --omit=dev`.
2. Развернуть содержимое `dist/` с nginx/PHP-FPM конфигурацией.
3. Проверить `GET /robots.txt`, `GET /sitemap.xml` и неизвестный URL со статусом 404.
4. Отправить тестовую заявку и подтвердить её появление в Telegram.
5. Отправить тестовый YClients webhook с корректным `company_id` из кабинета сервиса.
6. Пройти все CTA на ширинах 375 px и 1280 px.

## Контент, требующий подтверждения владельца

Не публикуйте неподтверждённые отзывы, сертификаты тренеров, количество оборудования или сравнительные заявления. Добавляйте их только вместе с фактическими именами, документами и разрешёнными материалами.
