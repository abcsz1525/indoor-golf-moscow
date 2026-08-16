import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

describe('site content structure', () => {
  let about = '';
  let brandStory = '';
  let aboutPage = '';
  let homePage = '';
  let techPage = '';
  let trackmanTeaser = '';
  let trackmanTechnology = '';
  let advantages = '';
  let gallery = '';
  let hero = '';
  let photoStrip = '';

  beforeAll(async () => {
    [about, brandStory, aboutPage, homePage, techPage, trackmanTeaser, trackmanTechnology, advantages, gallery, hero, photoStrip] = await Promise.all([
      readFile(resolve(process.cwd(), 'src/components/About.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/BrandStory.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/AboutPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/HomePage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/TechPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/TrackMan.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/TrackmanTechnology.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Advantages.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Gallery.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Hero.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/PhotoStrip.tsx'), 'utf8'),
    ]);
  });

  it('keeps About focused on the ID Golf ideology without founder identities', () => {
    expect(about).toContain('Мы — ID Golf');
    expect(about).toContain('современную культуру гольфа в России');
    expect(brandStory).toContain('ID — Identity');
    expect(brandStory).toContain('Гольф как часть идентичности');
    expect(brandStory).toContain('Зачем существует ID Golf');
    expect(brandStory).toContain('Развивать и популяризировать гольф в России');
    expect(aboutPage).not.toContain('Founders');
    expect(aboutPage).not.toContain('Андрей Золотарев');
    expect(aboutPage).not.toContain('Наталья Колыхалова');
    expect(aboutPage).not.toContain('founders/andrey.webp');
    expect(aboutPage).not.toContain('founders/natalia.webp');
    expect(aboutPage.indexOf('<About headingLevel={1} />')).toBeLessThan(aboutPage.indexOf('<BrandStory />'));
  });

  it('keeps the four core playing scenarios on the homepage without duplicate audience blocks', () => {
    expect(homePage).toContain('<StartHere onBooking={onBooking} />');
    expect(homePage).not.toContain('<ForWhom />');
    expect(homePage).not.toContain('<Activities />');
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
    expect(trackmanTeaser).toContain("['40+', 'параметров удара']");
    expect(advantages).toContain('eyebrow="Почему ID Golf"');
    expect(advantages).toContain('title="Всё для игры и отдыха"');
    expect(advantages).not.toContain("title: 'Trackman'");
    expect(advantages).toContain('border-b border-line');
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
    expect(gallery).toContain('h-auto w-full');
  });

  it('does not reuse removed gallery photos on the homepage', () => {
    expect(hero).toContain("assets/hero-club-wide.webp");
    expect(hero).not.toMatch(/gallery\/[2345]\.webp/);
    expect(photoStrip).not.toMatch(/gallery\/[2345]\.webp/);
    expect(photoStrip).toContain('gallery/club-6335.webp');
    expect(photoStrip).toContain('gallery/club-6338-retouched.webp');
    expect(photoStrip).toContain('gallery/club-6345.webp');
    expect(photoStrip).toContain('gallery/1.webp');
  });
});
