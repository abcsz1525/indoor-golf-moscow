import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readEndpoint = (name: string) => readFile(resolve(process.cwd(), 'public', 'api', name), 'utf8');

/**
 * 27.08.2026 из трёх заявок одна не дошла в Telegram: отправка была
 * одноразовой, и при обрыве канала уведомление терялось молча, хотя клиенту
 * показывался успех. Эти проверки закрывают именно эту потерю.
 */
describe('Доставка уведомлений переживает обрыв канала до Telegram', () => {
  it('повторяет отправку и не теряет уведомление при отказе', async () => {
    const source = await readEndpoint('_telegram.php');

    expect(source).toMatch(/TELEGRAM_SEND_ATTEMPTS\s*=\s*([3-9]|\d{2,})/);
    expect(source).toContain('function telegram_send(');
    expect(source).toContain('function telegram_enqueue(');
    expect(source).toContain('function telegram_flush_queue(');

    // Провал доставки обязан приводить к постановке в очередь, а не к молчанию.
    expect(source).toContain('telegram_enqueue($text, $kind, $reference, $result[\'error\']);');
  });

  it('держит очередь вне web-root и закрывает её от посторонних', async () => {
    const source = await readEndpoint('_telegram.php');

    expect(source).toContain('dirname($documentRoot, 2)');
    expect(source).toContain("'indoor-golf-private'");
    expect(source).toContain("'telegram-queue.ndjson'");
    expect(source).toContain('@chmod($path, 0600)');
    expect(source).toContain('@chmod($directory, 0700)');
  });

  it('не удаляет из очереди то, что не удалось отправить', async () => {
    const source = await readEndpoint('_telegram.php');
    const flush = source.slice(source.indexOf('function telegram_flush_queue('));

    // Неуспешный элемент возвращается в $kept и переписывается обратно в файл.
    expect(flush).toContain('$kept[] = $item;');
    expect(flush).toContain('ftruncate($handle, 0)');
    expect(flush).toContain('flock($handle, LOCK_EX)');
  });

  it('заявка с сайта отвечает клиенту до похода в Telegram и досылает очередь', async () => {
    const source = await readEndpoint('lead.php');

    expect(source).toContain("require_once __DIR__ . '/_telegram.php';");
    expect(source).toContain('store_lead($record)');
    expect(source).toContain('release_client();');
    expect(source).toContain('telegram_deliver(');
    expect(source).toContain('telegram_flush_queue(');

    // Ответ клиенту должен уходить раньше отправки уведомления.
    expect(source.indexOf('release_client();')).toBeLessThan(source.indexOf('telegram_deliver('));

    // Старая одноразовая отправка не должна вернуться.
    expect(source).not.toContain('function send_telegram_notice(');
  });

  it('вебхук YClients ведёт журнал входящих и объясняет пропуски', async () => {
    const source = await readEndpoint('yclients-webhook.php');

    expect(source).toContain('function yclients_log(');
    expect(source).toContain("'yclients-webhook.log'");
    expect(source).toContain('ПРИНЯТО');
    expect(source).toContain('ПРОПУЩЕНО: company_id=');
    expect(source).toContain('ПРОПУЩЕНО: status=');
    expect(source).toContain('ОТКАЗ 403');
    expect(source).toContain('telegram_deliver(');
    expect(source).not.toContain("json_response(502, ['ok' => false, 'error' => 'delivery_failed']);");
  });

  it('досылка отложенных закрыта паролем администратора', async () => {
    const source = await readEndpoint('notify-retry.php');

    expect(source).toContain("server_secret('LEADS_ADMIN_PASSWORD')");
    expect(source).toContain('hash_equals');
    expect(source).toContain('telegram_flush_queue(');
    expect(source).toContain('REDIRECT_HTTP_AUTHORIZATION');
  });
});
