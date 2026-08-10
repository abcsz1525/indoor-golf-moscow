import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

describe('site content structure', () => {
  let about = '';
  let founders = '';
  let aboutPage = '';
  let homePage = '';
  let techPage = '';

  beforeAll(async () => {
    [about, founders, aboutPage, homePage, techPage] = await Promise.all([
      readFile(resolve(process.cwd(), 'src/components/About.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/components/Founders.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/AboutPage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/HomePage.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'src/pages/TechPage.tsx'), 'utf8'),
    ]);
  });

  it('explains the ID Golf ideology and identifies the founders on About', () => {
    expect(about).toContain('ID = <span className="text-brand-orange">Identity</span>');
    expect(about).toContain('Identity — идентичность');
    expect(about).toContain('Найди свой ID в гольфе.');
    expect(founders).toContain("name: 'Андрей'");
    expect(founders).toContain("name: 'Наталья'");
    expect(aboutPage).toContain('<Founders />');
  });

  it('keeps audience and activity scenarios on the homepage', () => {
    expect(homePage).toContain('<ForWhom />');
    expect(homePage).toContain('<Activities />');
    expect(aboutPage).not.toContain('<ForWhom />');
    expect(aboutPage).not.toContain('<Activities />');
  });

  it('groups Why Us and Advantages with technology', () => {
    expect(techPage).toContain('<TrackMan headingLevel={1} />');
    expect(techPage).toContain('<WhyUs />');
    expect(techPage).toContain('<Advantages />');
    expect(homePage).not.toContain('<WhyUs />');
    expect(aboutPage).not.toContain('<Advantages />');
  });
});
