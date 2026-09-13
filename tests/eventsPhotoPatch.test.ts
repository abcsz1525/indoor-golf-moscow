import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  INVITATIONAL_2026_ALBUMS,
  INVITATIONAL_2026_COVER,
  INVITATIONAL_2026_PHOTOS,
} from '../src/data/invitational2026Photos';

// На бою страница «События» собрана из старого бандла, и фотоотчёт туда ставится DOM-патчем
// deploy/patches/events-photo-report.html. Патч должен показывать те же кадры, что и React-блок
// в репозитории, а все файлы кадров — лежать в public/img/invitational-2026.

describe('production DOM patch for the tournament photo report', () => {
  let patch = '';

  beforeAll(async () => {
    patch = await readFile(resolve(process.cwd(), 'deploy/patches/events-photo-report.html'), 'utf8');
  });

  it('lists exactly the photos from the data module, in the same order', () => {
    const inPatch = [...patch.matchAll(/^\s*\['((?:pi[12]|nv)-\d{4})',/gm)].map((m) => m[1]);
    const inData = INVITATIONAL_2026_PHOTOS.map((p) => p.src.replace(/^.*\/((?:pi[12]|nv)-\d{4})\.webp$/, '$1'));
    expect(inPatch).toEqual(inData);
  });

  it('uses the same cover and both album links, no photographer credit', () => {
    const coverFile = INVITATIONAL_2026_COVER.src.replace(/^.*\/(pi[12]-\d{4})\.webp$/, '$1');
    expect(patch).toContain(`file: '${coverFile}'`);
    for (const album of INVITATIONAL_2026_ALBUMS) {
      expect(patch).toContain(album.url);
      expect(patch).toContain(`'${album.label}'`);
    }
    expect(patch).not.toMatch(/Фото:/);
    expect(patch).toContain("BASE = '/img/invitational-2026/'");
  });

  it('is self-contained: own id, own styles, inserted only once', () => {
    expect(patch).toContain('id="ig-photo-report-js"');
    expect(patch).not.toContain('<script id="ig-photo-report">');
    expect(patch).toContain('id="ig-photo-report-css"');
    expect(patch).toContain("document.getElementById('ig-photo-report')");
    expect(patch).toContain('MutationObserver');
  });

  it('ships every referenced image file (full size and thumbnail)', async () => {
    for (const photo of INVITATIONAL_2026_PHOTOS) {
      await expect(access(resolve(process.cwd(), 'public', photo.src.slice(1)))).resolves.toBeUndefined();
      await expect(access(resolve(process.cwd(), 'public', photo.thumb.slice(1)))).resolves.toBeUndefined();
    }
  });
});
