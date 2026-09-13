// Фотоотчёт с Pro-Am турнира ID Golf Invitational, 4 сентября 2026, гольф- и яхт-клуб «Пестово».
// Микс двух фотографов: `pi1-*`/`pi2-*` — архив на Яндекс Диске (828 кадров), `nv-*` — галерея
// Наташи Волконской на gallery.photo (818 кадров, живёт до марта 2027). Файлы в public/img/invitational-2026:
// `*.webp` — 1600 px по длинной стороне (лайтбокс), `*-thumb.webp` — 800 px (сетка).
// Внешние галереи временные, поэтому отобранные кадры хостятся на сайте.

export interface EventPhoto {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
}

export interface EventAlbum {
  label: string;
  url: string;
}

const BASE = '/img/invitational-2026';

function photo(file: string, alt: string, width: number, height: number): EventPhoto {
  return { src: `${BASE}/${file}.webp`, thumb: `${BASE}/${file}-thumb.webp`, alt, width, height };
}

export const INVITATIONAL_2026_ALBUMS: EventAlbum[] = [
  { label: 'Архив 1', url: 'https://disk.yandex.ru/d/GsO574EGL1z4uQ' },
  {
    label: 'Архив 2',
    url: 'https://66069dcc007a32-82727812.gallery.photo/gallery/id-golf-invitational-2026-pro-am-turnir-3hznuk/',
  },
];

export const INVITATIONAL_2026_COVER = photo(
  'pi2-0529',
  'Победители турнира ID Golf Invitational 2026 с призами «Матрёшка» от ЦЕНТРСВЕТ',
  1600,
  960,
);

export const INVITATIONAL_2026_PHOTOS: EventPhoto[] = [
  photo('pi1-5434', 'Скоркарта ID Golf Invitational 2026 и карта гостя турнира', 1600, 1067),
  photo('nv-0218', 'Разминка на драйвинг-рейндже: «Поспешишь — всё поле насмешишь»', 1067, 1600),
  photo('nv-0091', 'Разминка перед стартом', 1067, 1600),
  photo('nv-0142', 'Участницы на драйвинг-рейндже', 1067, 1600),
  photo('pi1-9852', 'Клубный дом гольф- и яхт-клуба «Пестово» на закате', 1600, 1067),
  photo('pi1-5634', 'Удар с ти у клубного дома', 1600, 1067),
  photo('nv-0137', 'Свинг на первой лунке', 1067, 1600),
  photo('pi1-7570', 'Выход из бункера', 1600, 1067),
  photo('nv-0214', 'Озеро и клубный дом «Пестово»', 1600, 1067),
  photo('pi1-5986', 'Команды идут по фервею вдоль озера', 1600, 1067),
  photo('pi1-5876', 'Команда в оранжевой форме перед стартом', 1600, 1067),
  photo('nv-0209', 'Участницы турнира на поле', 1067, 1600),
  photo('pi1-7656', 'Команда Pro-Am у озера: профессионал и три любителя', 1600, 1143),
  photo('pi1-6959', 'Эмоции после удачного удара', 958, 1600),
  photo('pi1-8564', 'Хай-файв на фервее после удачного патта', 1600, 1067),
  photo('nv-0698', 'Лиса на поле «Пестово» во время турнира', 1067, 1600),
  photo('pi1-6093', 'Команда у лунки партнёра турнира Wintecare — BonaFide Medicine', 1600, 1067),
  photo('nv-0784', 'Призы турнира: арт-объекты «Матрёшка» и кубки на церемонии награждения', 1067, 1600),
  photo('pi2-0409', 'Церемония награждения: приветствие участников', 1600, 1069),
  INVITATIONAL_2026_COVER,
  photo('nv-0894', 'Победительница с призом турнира', 1067, 1600),
  photo('pi2-0569', 'Награждение команд-призёров турнира', 1600, 1135),
  photo('nv-0790', 'Вечер после турнира на террасе клубного дома', 1067, 1600),
  photo('pi2-0628', 'Вечер после турнира в клубном доме', 1460, 1600),
];
