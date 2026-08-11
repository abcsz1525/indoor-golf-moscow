import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

describe('site content structure', () => {
  let about = '';
  let brandStory = '';
  let founders = '';
  let aboutPage = '';
  let homePage = '';
  let techPage = '';
  let trackmanTeaser = '';
  let trackmanTechnology = '';
  let advantages = '';
  let gallery = '';

  beforeAll(async () => {
    [about, brandStory, founders, aboutPage, homePage, techPage, trackmanTeaser, trackmanTechnology, advantages, gallery] = await Promise.all([
      readFile(resolve(process.cwd(), 'src/components/About.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/BrandStory.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Founders.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/AboutPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/HomePage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/TechPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/TrackMan.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/TrackmanTechnology.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Advantages.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Gallery.tsx'), 'utf8'),
    ]);
  });

  it('explains the ID Golf ideology and identifies the founders on About', () => {
    expect(about).toContain('Новая культура');
    expect(about).toContain('современную, открытую культуру гольфа в России');
    expect(about).toContain('ID = <span className="text-brand-orange">Identity</span>');
    expect(about).toContain('Identity — идентичность');
    expect(brandStory).toContain('Что означает ID');
    expect(brandStory).toContain('Во что мы верим');
    expect(brandStory).toContain('Что мы создаём');
    expect(brandStory).toContain('Найди свой');
    expect(brandStory).toContain('section-title-id');
    expect(founders).toContain("name: 'Андрей Золотарев'");
    expect(founders).toContain("name: 'Наталья Колыхалова'");
    expect(founders).toContain("role: 'Сооснователь ID Golf'");
    expect(founders).toContain("founders/andrey.webp");
    expect(founders).toContain("founders/natalia.webp");
    expect(aboutPage.indexOf('<About headingLevel={1} />')).toBeLessThan(aboutPage.indexOf('<Founders />'));
    expect(aboutPage.indexOf('<Founders />')).toBeLessThan(aboutPage.indexOf('<BrandStory />'));
  });

  it('keeps audience and activity scenarios on the homepage', () => {
    expect(homePage).toContain('<ForWhom />');
    expect(homePage).toContain('<Activities />');
    expect(aboutPage).not.toContain('<ForWhom />');
    expect(aboutPage).not.toContain('<Activities />');
  });

  it('builds a dedicated Trackman story and keeps the distinct club advantages', () => {
    expect(techPage).toContain('<TrackmanTechnology />');
    expect(techPage).not.toContain('<WhyUs />');
    expect(trackmanTechnology).toContain('<Advantages />');
    expect(trackmanTechnology).toContain('Два радара. Одна камера. Полная картина удара.');
    expect(trackmanTechnology).toContain("value: '40+'");
    expect(trackmanTechnology).toContain("value: '90 / 100'");
    expect(trackmanTechnology).toContain("value: '17'");
    expect(trackmanTechnology).toContain("value: '13'");
    expect(trackmanTechnology).toContain("value: '25'");
    expect(trackmanTechnology).toContain('Источник: PGA Tour');
    expect(trackmanTechnology).toContain('Глобальная библиотека Trackman — более 550 детально воссозданных полей');
    expect(trackmanTechnology).toContain('Глобальная библиотека Trackman включает более 550 виртуальных полей');
    expect(trackmanTechnology).toContain('Посмотрите на свою игру в деталях');
    expect(trackmanTechnology).toContain('Технология помогает увидеть ваш ID');
    expect(trackmanTechnology).not.toContain('value: 285');
    expect(trackmanTechnology).not.toContain('value: 245');
    expect(trackmanTeaser).not.toContain('value: 285');
    expect(trackmanTeaser).not.toContain('value: 245');
    expect(trackmanTeaser).toContain("value: '40+'");
    expect(advantages).toContain('eyebrow="Почему ID Golf"');
    expect(advantages).toContain('title="Всё для игры и отдыха"');
    expect(advantages).not.toContain("title: 'TrackMan'");
    expect(advantages).toContain("i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'");
    expect(homePage).not.toContain('<WhyUs />');
    expect(aboutPage).not.toContain('<Advantages />');
  });

  it('shows only the approved gallery images', () => {
    expect(gallery).toContain("gallery/1.webp");
    expect(gallery).toContain("gallery/6.webp");
    expect(gallery).not.toMatch(/gallery\/[2345]\.webp/);
    for (const photo of [6335, 6340, 6341, 6342, 6343, 6344, 6345]) {
      expect(gallery).toContain(`gallery/club-${photo}.webp`);
    }
    expect(gallery).toContain('gallery/club-6338-retouched.webp');
    expect(gallery).not.toContain('gallery/club-6338.webp');
    for (const removedPhoto of [6336, 6337, 6339]) {
      expect(gallery).not.toContain(`gallery/club-${removedPhoto}.webp`);
    }
    expect(gallery).toContain('object-contain');
    expect(gallery).not.toContain('object-cover');
  });
});
