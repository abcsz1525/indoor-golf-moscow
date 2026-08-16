import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readEndpoint = (name: string) => readFile(resolve(process.cwd(), 'public', 'api', name), 'utf8');

describe('PHP endpoint security contracts', () => {
  it('keeps credentials in environment or a file outside web-root', async () => {
    const [source, config] = await Promise.all([
      readEndpoint('lead.php'),
      readEndpoint('_server-config.php'),
    ]);
    expect(source).toContain("server_secret('TG_BOT_TOKEN')");
    expect(source).toContain("server_secret('TG_CHAT_ID')");
    expect(config).toContain('getenv($name)');
    expect(config).toContain('dirname($documentRoot, 2)');
    expect(config).toContain('indoor-golf-secrets.php');
    expect(`${source}\n${config}`).not.toContain('__PASTE_BOT_TOKEN__');
  });

  it('authenticates the webhook and requires the expected company', async () => {
    const source = await readEndpoint('yclients-webhook.php');
    expect(source).toContain("server_secret('YCLIENTS_WEBHOOK_KEY')");
    expect(source).toContain('hash_equals');
    expect(source).toContain("!isset($event['company_id'])");
    expect(source).not.toContain('igm-yc-9f3a71');
  });

  it('ships ISPmanager rewrites and blocks every private PHP helper', async () => {
    const source = await readFile(resolve(process.cwd(), 'public', '.htaccess'), 'utf8');
    expect(source).toContain('ErrorDocument 404 /404.html');
    expect(source).toContain('R=404');
    expect(source).toContain('RewriteRule ^api/_.*\\.php$ - [R=404,L,NC]');
    expect(source).toContain('RewriteRule ^technology/?$ /tech [R=301,L,NC]');
    expect(source).toContain('X-Content-Type-Options "nosniff"');
    expect(source).toContain('Content-Security-Policy');
    expect(source.match(/<IfModule/g)).toHaveLength(source.match(/<\/IfModule>/g)?.length ?? 0);
  });

  it('accepts Basic Auth through REG.RU FastCGI forwarding', async () => {
    const [source, htaccess] = await Promise.all([
      readEndpoint('leads-admin.php'),
      readFile(resolve(process.cwd(), 'public', '.htaccess'), 'utf8'),
    ]);

    expect(source).toContain("REDIRECT_HTTP_AUTHORIZATION");
    expect(source).toContain("function_exists('getallheaders')");
    expect(htaccess).toContain('SetEnvIf Authorization');
  });

  it('requires separate consent, stores leads in Russia and keeps personal data out of Telegram', async () => {
    const [source, storage, webhook] = await Promise.all([
      readEndpoint('lead.php'),
      readEndpoint('_lead-storage.php'),
      readEndpoint('yclients-webhook.php'),
    ]);

    expect(source).toContain("CURRENT_CONSENT_VERSION = '2026-08-11'");
    expect(source).toContain("'accepted' => true");
    expect(source).toContain('store_lead($record)');
    expect(source).not.toContain('"👤 Имя: $name"');
    expect(source).not.toContain('"📱 Телефон: $phone"');
    expect(storage).toContain("'indoor-golf-private'");
    expect(storage).toContain("'leads.ndjson'");
    expect(webhook).not.toContain('"👤 Имя: $name"');
    expect(webhook).not.toContain('"📱 Телефон: $phone"');
  });
});
