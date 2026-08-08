import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Invitational content contracts', () => {
  let html = '';

  beforeAll(async () => {
    html = await readFile(resolve(process.cwd(), 'public', 'invitational', 'index.html'), 'utf8');
  });

  it('keeps the awards reveal editorial instead of a product catalogue', () => {
    expect(html).toContain('памятный арт-объект');
    expect(html).toContain('останется тайной до церемонии награждения');
    expect(html).not.toContain('LOONA X100');
    expect(html).not.toContain('class="prizes"');
  });

  it('announces the chief judge and the revised guest activities', () => {
    expect(html).toContain('Виктор Вадимович Мочалов');
    expect(html).toContain('The Open');
    expect(html).toContain('Мини-турнир по настольному теннису');
    expect(html).not.toContain('<b>Турнир по сквошу</b>');
    expect(html).toContain('Гольф-клиника и мини-контесты');
  });

  it('links every partner tile to an external site safely', () => {
    expect(html.match(/class="partnerLink/g)).toHaveLength(8);
    expect(html.match(/rel="noopener noreferrer"/g)).toHaveLength(8);
    expect(html).toContain('https://www.centersvet.ru/');
    expect(html).toContain('https://bonafidemed.ru/');
    expect(html).toContain('https://squashclub.moscow/');
  });
});
