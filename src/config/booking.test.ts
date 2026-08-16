import { describe, expect, it } from 'vitest';
import { isYClientsEmbedEnabled } from './booking';

describe('isYClientsEmbedEnabled', () => {
  it('enables a valid public booking URL when the flag is not configured', () => {
    expect(isYClientsEmbedEnabled('https://example.yclients.com/', undefined)).toBe(true);
  });

  it('keeps the embed enabled when the flag is explicitly true', () => {
    expect(isYClientsEmbedEnabled('https://example.yclients.com/', 'true')).toBe(true);
  });

  it('uses explicit false as an emergency kill switch', () => {
    expect(isYClientsEmbedEnabled('https://example.yclients.com/', 'false')).toBe(false);
  });

  it('does not enable malformed or unsupported URLs', () => {
    expect(isYClientsEmbedEnabled('not-a-url', undefined)).toBe(false);
    expect(isYClientsEmbedEnabled('javascript:alert(1)', undefined)).toBe(false);
  });
});
