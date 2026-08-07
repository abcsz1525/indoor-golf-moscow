import { readFile, writeFile } from 'node:fs/promises';

const SITE_URL = 'https://indoor-golf.ru';
const IMAGE_URL = `${SITE_URL}/apple-touch-icon.png`;

const pages = [
  { path: '/about', title: 'Indoor Golf Moscow — indoor-гольф клуб в Лужниках', description: 'Гольф в помещении круглый год: симуляторы Trackman, тренеры PRO, форматы для новичков, любителей и корпоративов. Лужники, охраняемая парковка.' },
  { path: '/tech', title: 'Симулятор Trackman в Москве | Indoor Golf Moscow', description: 'Гольф-симулятор Trackman: анализ скорости мяча, угла вылета, вращения и дистанции. Тренировки и игра в Лужниках.' },
  { path: '/gallery', title: 'Фото клуба Indoor Golf Moscow в Лужниках', description: 'Зал, тренировки и атмосфера Indoor Golf Moscow. Посмотрите пространство и симуляторы Trackman до визита.' },
  { path: '/services', title: 'Цены на гольф-симулятор в Москве | Indoor Golf Moscow', description: 'Аренда Trackman от 6 000 ₽/час до 4 человек, тренировки с PRO, абонементы и аренда клюшек в Лужниках.' },
  { path: '/events', title: 'События Indoor Golf Moscow — турниры и мероприятия', description: 'Турниры, клубные вечера и открытые мероприятия Indoor Golf Moscow.' },
  { path: '/contacts', title: 'Контакты Indoor Golf Moscow — Лужники 24, стр. 21', description: 'Москва, ул. Лужники 24, стр. 21, Дворец тенниса, блок C. Ежедневно 7:00–23:00. Телефон 8 (926) 092-69-19.' },
  { path: '/privacy', title: 'Политика конфиденциальности | Indoor Golf Moscow', description: 'Как Indoor Golf Moscow обрабатывает данные, переданные через формы записи и внешние сервисы.' },
];

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function render(meta, noIndex = false) {
  const url = new URL(meta.path, SITE_URL).toString();
  const title = escapeAttribute(meta.title);
  const description = escapeAttribute(meta.description);
  return template
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta name="robots" content="[^"]*"\s*\/>/, `<meta name="robots" content="${noIndex ? 'noindex, nofollow' : 'index, follow'}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${IMAGE_URL}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${IMAGE_URL}" />`);
}

for (const page of pages) {
  await writeFile(new URL(`../dist${page.path}.html`, import.meta.url), render(page));
}

await writeFile(
  new URL('../dist/404.html', import.meta.url),
  render({
    path: '/404',
    title: 'Страница не найдена | Indoor Golf Moscow',
    description: 'Запрошенная страница не найдена.',
  }, true),
);
