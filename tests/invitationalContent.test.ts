import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

const WITHDRAWN_PUBLIC_DETAILS = [
  'ID Golf Invitational 2026',
  '4 сентября',
  '04.09.26',
  'Нахабино',
  'Moscow Country Club',
  '37 000 ₽',
  '55 000 ₽',
  '17 000 ₽',
  'Приём заявок открыт',
  'Оставить заявку',
];

function expectNoWithdrawnDetails(content: string) {
  for (const detail of WITHDRAWN_PUBLIC_DETAILS) {
    expect(content).not.toContain(detail);
  }
}

describe('temporary tournament publication pause', () => {
  let invitational = '';
  let eventsPage = '';
  let rulesPage = '';
  let sitemap = '';
  let postbuild = '';

  beforeAll(async () => {
    [invitational, eventsPage, rulesPage, sitemap, postbuild] = await Promise.all([
      readFile(resolve(process.cwd(), 'public/invitational/index.html'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/EventsPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/TournamentRulesPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8'),
      readFile(resolve(process.cwd(), 'scripts/postbuild.mjs'), 'utf8'),
    ]);
  });

  it('serves a branded noindex maintenance page at the direct invitational URL', () => {
    expect(invitational).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(invitational).toContain('Indoor Golf Moscow');
    expect(invitational).toContain('Раздел обновляется');
    expect(invitational).toContain('уточняем программу, календарь и площадку события');
    expect(invitational).toContain('class="backSite"');
    expect(invitational).toContain('href="/"');
    expect(invitational).not.toMatch(/<form\b/i);
    expect(invitational).not.toMatch(/<(?:input|select|textarea)\b/i);
    expect(invitational).not.toContain('/api/lead.php');
    expectNoWithdrawnDetails(invitational);
  });

  it('shows only a neutral update notice in the public events calendar', () => {
    expect(eventsPage).toContain('Готовим обновлённый календарь');
    expect(eventsPage).toContain('уточняем календарь, программу и площадки ближайших событий');
    expect(eventsPage).not.toContain('/invitational/');
    expectNoWithdrawnDetails(eventsPage);
  });

  it('preserves the corporate event enquiry on the events page', () => {
    expect(eventsPage).toContain('Хотите провести своё мероприятие на нашей площадке');
    expect(eventsPage).toContain('to="/contacts#booking"');
    expect(eventsPage).toContain('Обсудить мероприятие');
  });

  it('replaces tournament rules with a noindex update notice', () => {
    expect(rulesPage).toContain('Раздел обновляется');
    expect(rulesPage).toContain('уточняем программу и площадку события');
    expect(rulesPage).toContain("{ path: '/tournament-rules', noIndex: true }");
    expectNoWithdrawnDetails(rulesPage);
  });

  it('removes paused tournament URLs from discovery and noindexes generated rules metadata', () => {
    expect(sitemap).not.toContain('/invitational/');
    expect(sitemap).not.toContain('/tournament-rules');
    expect(sitemap).toContain('https://indoor-golf.ru/events');
    expect(postbuild).toContain("'/consent', '/legal', '/tournament-rules'");
    expect(postbuild).toContain('Турнирные документы обновляются | Indoor Golf Moscow');
    expectNoWithdrawnDetails(postbuild);
  });
});
