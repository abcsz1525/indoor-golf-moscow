import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readEndpoint = (name: string) => readFile(resolve(process.cwd(), 'public', 'api', name), 'utf8');

describe('PHP endpoint security contracts', () => {
  it('keeps Telegram credentials in the server environment', async () => {
    const source = await readEndpoint('lead.php');
    expect(source).toContain("getenv('TG_BOT_TOKEN')");
    expect(source).toContain("getenv('TG_CHAT_ID')");
    expect(source).not.toContain('__PASTE_BOT_TOKEN__');
  });

  it('authenticates the webhook and requires the expected company', async () => {
    const source = await readEndpoint('yclients-webhook.php');
    expect(source).toContain("getenv('YCLIENTS_WEBHOOK_KEY')");
    expect(source).toContain('hash_equals');
    expect(source).toContain("!isset($event['company_id'])");
    expect(source).not.toContain('igm-yc-9f3a71');
  });
});
