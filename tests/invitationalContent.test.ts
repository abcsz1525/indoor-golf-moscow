import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

// Турнир ID Golf Invitational прошёл 04.09.2026. Лендинг /invitational/ с формой заявки
// удалён: сайт больше не собирает заявки на прошедшее событие. На сайте остаётся только
// карточка с итогами в разделе «События».
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

describe('tournament section after the event', () => {
  let htaccess = '';
  let sitemap = '';
  let eventsPage = '';
  let rulesPage = '';
  let postbuild = '';
  let template = '';

  beforeAll(async () => {
    [htaccess, sitemap, eventsPage, rulesPage, postbuild, template] = await Promise.all([
      readFile(resolve(process.cwd(), 'public/.htaccess'), 'utf8'),
      readFile(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/EventsPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/TournamentRulesPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'scripts/postbuild.mjs'), 'utf8'),
      readFile(resolve(process.cwd(), 'index.html'), 'utf8'),
    ]);
  });

  it('лендинг турнира удалён из публичной статики', async () => {
    await expect(access(resolve(process.cwd(), 'public/invitational'))).rejects.toThrow();
  });

  it('старые адреса турнира ведут в «События», а не в 404', () => {
    expect(htaccess).toContain('RewriteRule ^invitational(/.*)?$ /events [R=301,L,NC]');
    // Редирект должен стоять раньше правила «существующие файлы отдаём как есть»,
    // иначе на сервере с оставшейся папкой он не сработает.
    expect(htaccess.indexOf('^invitational')).toBeLessThan(htaccess.indexOf('%{REQUEST_FILENAME} -f'));
  });

  it('карта сайта больше не ведёт на лендинг и регламент', () => {
    expect(sitemap).not.toContain('/invitational');
  });

  it('показывает турнир в календаре как прошедшее событие без ссылки на лендинг', () => {
    expect(eventsPage).toContain('Турнир завершён');
    expect(eventsPage).toContain('30 команд');
    // Ссылок на закрытый лендинг нет (импорт данных фотоотчёта из ../data/invitational… не в счёт).
    expect(eventsPage).not.toMatch(/["'`]\/invitational/);
    expect(eventsPage).not.toContain('Открыта запись');
    expect(eventsPage).not.toContain('/img/pestovo-course.jpg');
    expect(eventsPage).toContain('INVITATIONAL_2026_COVER');
    expect(eventsPage).toContain('<EventPhotoReport');
    expectNoStaleDetails(eventsPage);
  });

  it('фото карточки турнира лежит вне удалённого раздела', async () => {
    await expect(access(resolve(process.cwd(), 'public/img/pestovo-course.jpg'))).resolves.toBeUndefined();
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

  it('после турнира на сайте нет плашки живого счёта', () => {
    expect(template).not.toContain('ig-live-badge');
    expect(template).not.toContain('LIVE');
  });
});
