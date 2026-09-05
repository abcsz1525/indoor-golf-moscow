import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

// Детали, которые не должны просачиваться на нейтральные страницы сайта
// (сам турнирный лендинг теперь публичен и легитимно содержит дату и цены).
const STALE_TOURNAMENT_DETAILS = [
  'Нахабино',
  'Moscow Country Club',
  '37 000 ₽',
  '55 000 ₽',
  'Приём заявок открыт',
];

function expectNoStaleDetails(content: string) {
  for (const detail of STALE_TOURNAMENT_DETAILS) {
    expect(content).not.toContain(detail);
  }
}

describe('public tournament section', () => {
  let invitational = '';
  let robots = '';
  let eventsPage = '';
  let rulesPage = '';
  let sitemap = '';
  let postbuild = '';

  beforeAll(async () => {
    [invitational, robots, eventsPage, rulesPage, sitemap, postbuild] = await Promise.all([
      readFile(resolve(process.cwd(), 'public/invitational/index.html'), 'utf8'),
      readFile(resolve(process.cwd(), 'public/robots.txt'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/EventsPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/TournamentRulesPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8'),
      readFile(resolve(process.cwd(), 'scripts/postbuild.mjs'), 'utf8'),
    ]);
  });

  it('serves the full public landing with current venue, schedule and tariffs', () => {
    expect(invitational).toContain('Пестово');
    expect(invitational).toContain('44 000 ₽');
    expect(invitational).toContain('60 000 ₽');
    expect(invitational).toContain('27 000 ₽');
    // Финальная программа дня от 04.09.2026: сбор в 09:00, старты с 09:50.
    expect(invitational).toContain('Оглашение регламента и старт');
    expect(invitational).toContain('09:50');
    expect(invitational).toContain('BOSCO');
    expect(invitational).toContain('/api/lead.php');
    expect(invitational).toContain('consent');
    expect(invitational).not.toContain('noindex');
    expectNoStaleDetails(invitational);
  });

  it('keeps rebranded and withdrawn names out of the landing', () => {
    expect(invitational).not.toMatch(/tursunov|турсунов/i);
    expect(invitational).not.toContain('клиник');
  });

  it('opens the section for discovery', () => {
    expect(robots).not.toContain('Disallow: /invitational/');
    expect(sitemap).toContain('https://indoor-golf.ru/invitational/');
  });

  it('показывает турнир в календаре как прошедшее событие', () => {
    // После 04.09.2026 карточка не должна вести на лендинг: заявки закрыты вместе с турниром.
    expect(eventsPage).toContain('Турнир завершён');
    expect(eventsPage).toContain('30 команд');
    expect(eventsPage).not.toContain('to="/invitational/"');
    expect(eventsPage).not.toContain('Открыта запись');
    expectNoStaleDetails(eventsPage);
  });

  it('preserves the corporate event enquiry on the events page', () => {
    expect(eventsPage).toContain('Хотите провести своё мероприятие на нашей площадке');
    expect(eventsPage).toContain('to="/contacts#booking"');
    expect(eventsPage).toContain('Оставить заявку');
  });

  it('keeps tournament rules page as a noindex notice until the regulations are confirmed', () => {
    expect(rulesPage).toContain("{ path: '/tournament-rules', noIndex: true }");
    expectNoStaleDetails(rulesPage);
  });

  it('keeps rules metadata noindexed in the prerender script', () => {
    expect(postbuild).toContain("'/consent', '/legal', '/tournament-rules'");
    expectNoStaleDetails(postbuild);
  });

  it('требует имя с фамилией, телефон и e-mail в заявке на турнир', () => {
    // Стартовый лист собирается по фамилиям, а подтверждение уходит на почту:
    // одного имени и телефона для этого мало.
    expect(invitational).toContain('<label for="n">Имя и фамилия</label>');
    expect(invitational).toContain('name="email"');
    expect(invitational).toContain('function hasSurname(');
    expect(invitational).toContain('function validEmail(');
    expect(invitational).toContain('email:email');

    for (const field of ['name="name"', 'name="phone"', 'name="email"']) {
      const tag = invitational.slice(invitational.indexOf(field));
      expect(tag.slice(0, tag.indexOf('>'))).toContain('required');
    }
  });

  it('открывает регламент турнира публично — страницей и файлом', async () => {
    // Регламент нужен участникам до оплаты: формат зачёта и расчёт гандикапа
    // нельзя прятать в переписку.
    expect(invitational).toContain('href="/invitational/reglament/"');

    const reglament = await readFile(
      resolve(process.cwd(), 'public', 'invitational', 'reglament', 'index.html'),
      'utf8',
    );
    expect(reglament).toContain('два лучших результата из четырёх');
    expect(reglament).toContain('Виктор Вадимович Мочалов');
    expect(reglament).toContain('href="/invitational/reglament.pdf"');
    expect(reglament).toContain('href="/invitational/#zayavka"');
    expectNoStaleDetails(reglament);
  });

  it('ведёт на лайвскоринг турнира из шапки и hero', () => {
    const live = 'https://live.indoor-golf.ru/t/id-golf-invitational-2026';
    const count = invitational.split(`href="${live}"`).length - 1;
    expect(count).toBeGreaterThanOrEqual(2);
    expect(invitational).toContain('Лайвскоринг');
  });

  it('лендинг и регламент не расходятся по формату и времени', async () => {
    // Участник читает обе страницы подряд: разные время сбора или формат старта
    // означают, что кто-то приедет не к тому часу.
    const reglament = await readFile(
      resolve(process.cwd(), 'public', 'invitational', 'reglament', 'index.html'),
      'utf8',
    );

    for (const page of [invitational, reglament]) {
      expect(page).toContain('09:00');
      expect(page).toContain('09:50');
      expect(page).toContain('13:30');
      expect(page).toContain('19:00');
      expect(page).not.toContain('Shotgun');
    }

    // Стартовый лист доступен с обеих страниц.
    for (const page of [invitational, reglament]) {
      expect(page).toContain('/invitational/start-list.pdf');
    }

    // Ограничение поля снято регламентом — на лендинге его тоже быть не должно.
    expect(invitational).not.toContain('двадцатью двумя');
    expect(invitational).not.toContain('22 команды');
  });

  it('держит кнопку живого счёта на всех страницах сайта', async () => {
    // Кнопка живёт в шаблоне вне #root: React её не перерисовывает, поэтому
    // после турнира достаточно удалить блок из index.html и пересобрать.
    const template = await readFile(resolve(process.cwd(), 'index.html'), 'utf8');
    expect(template).toContain('id="ig-live-badge"');
    expect(template).toContain('https://live.indoor-golf.ru/t/id-golf-invitational-2026');
  });
});
