// Фотоотчёт с Pro-Am турнира ID Golf Invitational, 4 сентября 2026, гольф- и яхт-клуб «Пестово».
// 16 кадров отобраны из полного архива (828 фото). Файлы лежат в public/img/invitational-2026:
// `*.webp` — 1600 px по длинной стороне (лайтбокс), `*-thumb.webp` — 800 px (сетка).
// Внешние галереи фотографа временные, поэтому отобранные кадры хостятся на сайте.

export interface EventPhoto {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
}

const BASE = '/img/invitational-2026';

function photo(file: string, alt: string, width: number, height: number): EventPhoto {
  return { src: `${BASE}/${file}.webp`, thumb: `${BASE}/${file}-thumb.webp`, alt, width, height };
}

export const INVITATIONAL_2026_ALBUM_URL = 'https://disk.yandex.ru/d/GsO574EGL1z4uQ';

export const INVITATIONAL_2026_COVER = photo(
  'pi2-0529',
  'Победители турнира ID Golf Invitational 2026 с призами «Матрёшка» от ЦЕНТРСВЕТ',
  1600,
  960,
);

export const INVITATIONAL_2026_PHOTOS: EventPhoto[] = [
  photo('pi1-5434', 'Скоркарта ID Golf Invitational 2026 и карта гостя турнира', 1600, 1067),
  photo('pi1-5457', 'Регистрация участников в клубном доме «Пестово»', 1600, 1067),
  photo('pi1-9852', 'Клубный дом гольф- и яхт-клуба «Пестово» на закате', 1600, 1067),
  photo('pi1-5634', 'Удар с ти у клубного дома', 1600, 1067),
  photo('pi1-5864', 'Свинг драйвером на первой лунке', 1600, 1067),
  photo('pi1-7570', 'Выход из бункера', 1600, 1067),
  photo('pi1-5986', 'Команды идут по фервею вдоль озера', 1600, 1067),
  photo('pi1-5876', 'Команда в оранжевой форме перед стартом', 1600, 1067),
  photo('pi1-7656', 'Команда Pro-Am у озера: профессионал и три любителя', 1600, 1143),
  photo('pi1-6959', 'Эмоции после удачного удара', 958, 1600),
  photo('pi1-8564', 'Хай-файв на фервее после удачного патта', 1600, 1067),
  photo('pi1-6093', 'Команда у лунки партнёра турнира Wintecare — BonaFide Medicine', 1600, 1067),
  photo('pi2-0409', 'Церемония награждения: приветствие участников', 1600, 1069),
  INVITATIONAL_2026_COVER,
  photo('pi2-0569', 'Награждение команд-призёров турнира', 1600, 1135),
  photo('pi2-0628', 'Вечер после турнира в клубном доме', 1460, 1600),
];
