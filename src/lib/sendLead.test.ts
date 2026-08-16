import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendLead } from './sendLead';
import { CONSENT_VERSION } from '../legal/company';

const lead = {
  name: 'Иван',
  phone: '+7 926 000-00-00',
  consent: {
    accepted: true as const,
    version: CONSENT_VERSION,
    acceptedAt: '2026-08-11T10:00:00.000Z',
  },
};

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
      body: expect.stringContaining(`"version":"${CONSENT_VERSION}"`),
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
