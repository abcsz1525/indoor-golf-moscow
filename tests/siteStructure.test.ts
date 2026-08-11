import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

describe('site content structure', () => {
  let about = '';
  let founders = '';
  let aboutPage = '';
  let homePage = '';
  let techPage = '';
  let advantages = '';
  let gallery = '';

  beforeAll(async () => {
    [about, founders, aboutPage, homePage, techPage, advantages, gallery] = await Promise.all([
      readFile(resolve(process.cwd(), 'src/components/About.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Founders.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/AboutPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/HomePage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/TechPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Advantages.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Gallery.tsx'), 'utf8'),
    ]);
  });

  it('explains the ID Golf ideology and identifies the founders on About', () => {
    expect(about).toContain('ID = <span className="text-brand-orange">Identity</span>');
    expect(about).toContain('Identity — идентичность');
    expect(about).toContain('Найди свой ID в гольфе.');
    expect(about).toContain('section-title-id');
    expect(founders).toContain("name: 'Андрей'");
    expect(founders).toContain("name: 'Наталья'");
    expect(founders).toContain("founders/andrey.webp");
    expect(founders).toContain("founders/natalia.webp");
    expect(aboutPage).toContain('<Founders />');
  });

  it('keeps audience and activity scenarios on the homepage', () => {
    expect(homePage).toContain('<ForWhom />');
    expect(homePage).toContain('<Activities />');
    expect(aboutPage).not.toContain('<ForWhom />');
    expect(aboutPage).not.toContain('<Activities />');
  });

  it('keeps one distinct advantages block with technology', () => {
    expect(techPage).toContain('<TrackMan headingLevel={1} />');
    expect(techPage).not.toContain('<WhyUs />');
    expect(techPage).toContain('<Advantages />');
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
    for (const photo of [6335, 6337, 6340, 6341, 6342, 6343, 6344, 6345]) {
      expect(gallery).toContain(`gallery/club-${photo}.webp`);
    }
    for (const removedPhoto of [6336, 6338, 6339]) {
      expect(gallery).not.toContain(`gallery/club-${removedPhoto}.webp`);
    }
    expect(gallery).toContain('object-contain');
    expect(gallery).not.toContain('object-cover');
  });
});
