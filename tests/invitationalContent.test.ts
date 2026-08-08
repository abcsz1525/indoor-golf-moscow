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
    expect(html).toContain('MATRЁSHKA — символ новой России');
    expect(html).toContain('на первом турнире ID Golf');
    expect(html).toContain('останется тайной до церемонии награждения');
    expect(html).not.toContain('LOONA X100');
    expect(html).not.toContain('class="prizes"');
  });

  it('spells out every special contest and its prize', () => {
    expect(html).toContain('Два драйвера TaylorMade Qi4D + фитинг');
    expect(html).toContain(
      'Победительница женской и победитель мужской номинации получат по драйверу TaylorMade Qi4D и персональный фитинг.',
    );
    expect(html).toContain('Паттер победителю каждого зачёта');
    expect(html).toContain('Closest вторым ударом · пар-4');
    expect(html).toContain('Отдельный приз от BONAFIDE MEDICINE');
  });

  it('announces the chief judge and the revised guest activities', () => {
    expect(html).toContain('Виктор Вадимович Мочалов');
    expect(html).toContain('The Open');
    expect(html).toContain('Мини-турнир по настольному теннису');
    expect(html).not.toContain('<b>Турнир по сквошу</b>');
    expect(html).toContain('Гольф-клиника и мини-контесты');
    expect(html).toContain('оборудование для пробы игры и участия в клинике предоставим');
    expect(html).not.toContain('подбор клюшек');
    expect(html).not.toContain('Welcome-box, клюшки, мячи и кар');
  });

  it('holds the detailed tournament schedule until it is confirmed', () => {
    expect(html).toContain('Точное расписание появится немного позже');
    expect(html).toContain('Следите за обновлениями.');
    expect(html).not.toContain('<div class="w">Утро</div>');
    expect(html).not.toContain('<div class="w">Старт</div>');
    expect(html).not.toContain('<div class="w">День</div>');
    expect(html).not.toContain('<div class="w">Вечер</div>');
    expect(html).not.toContain('<div class="w">Финал</div>');
  });

  it('links every partner tile to an external site safely', () => {
    expect(html.match(/class="partnerLink/g)).toHaveLength(8);
    expect(html.match(/rel="noopener noreferrer"/g)).toHaveLength(8);
    expect(html).toContain('https://www.centersvet.ru/');
    expect(html).toContain('https://bonafidemed.ru/');
    expect(html).toContain('https://squashclub.moscow/');
  });
});
