# Project instructions

## Testing

Run `npm run check` before handing off changes. Tests live beside the code and are documented in `TESTING.md`.

- Add a test for new business logic.
- Add a regression test for every reproducible bug.
- Exercise both success and failure branches of new conditionals.
- Never use real Telegram, YClients or customer credentials in tests.
- Do not commit changes that break existing tests, lint or the production build.

## Deploy Configuration (configured by /setup-deploy)

- Platform: REG.RU shared hosting, ISPmanager (manual upload)
- Production URL: https://indoor-golf.ru
- Deploy workflow: build `artifacts/indoor-golf-reg-ru.zip` and upload it through ISPmanager
- Deploy status command: HTTP checks against production
- Merge method: squash
- Project type: React/Vite web app with PHP endpoints
- Post-deploy health check: https://indoor-golf.ru/api/yclients-webhook.php

### Custom deploy hooks

- Pre-merge: `npm run check && npm audit --omit=dev`
- Deploy trigger: `npm run package:reg-ru`, then manual backup/upload/extract in ISPmanager
- Deploy status: poll `https://indoor-golf.ru` and verify the expected route metadata
- Health check: homepage 200, privacy 200, unknown route 404, webhook JSON `ok: true`, then a real test lead
