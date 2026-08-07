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

  it('ships ISPmanager rewrites and blocks the config helper', async () => {
    const source = await readFile(resolve(process.cwd(), 'public', '.htaccess'), 'utf8');
    expect(source).toContain('ErrorDocument 404 /404.html');
    expect(source).toContain('R=404');
    expect(source).toContain('RewriteRule ^api/_server-config\\.php$ - [R=404,L,NC]');
    expect(source).toContain('X-Content-Type-Options "nosniff"');
    expect(source.match(/<IfModule/g)).toHaveLength(source.match(/<\/IfModule>/g)?.length ?? 0);
  });
});
