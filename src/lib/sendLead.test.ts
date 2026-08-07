import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendLead } from './sendLead';

const lead = { name: 'Иван', phone: '+7 926 000-00-00' };

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('sendLead', () => {
  it('accepts only an HTTP success with an explicit ok flag', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(sendLead(lead)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith('/api/lead.php', expect.objectContaining({
      method: 'POST',
    }));
  });

  it('rejects an HTML or otherwise invalid response even when HTTP is 200', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => { throw new SyntaxError('not json'); },
    }));

    await expect(sendLead(lead)).rejects.toThrow('lead delivery failed');
  });

  it('rejects a server error and keeps the server error code', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: 'delivery_failed' }),
    }));

    await expect(sendLead(lead)).rejects.toThrow('delivery_failed');
  });
});
