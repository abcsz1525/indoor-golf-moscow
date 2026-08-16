import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const PUBLIC_HOURS_FILES = [
  'index.html',
  'scripts/postbuild.mjs',
  'src/components/Advantages.tsx',
  'src/components/BookingForm.tsx',
  'src/components/FinalCTA.tsx',
  'src/components/Hero.tsx',
  'src/components/Location.tsx',
  'src/legal/company.ts',
  'src/pages/ContactsPage.tsx',
  'src/pages/HomePage.tsx',
];

describe('public operating hours', () => {
  it('shows a 9:00 opening time everywhere and keeps structured data in sync', async () => {
    const contents = await Promise.all(
      PUBLIC_HOURS_FILES.map((file) => readFile(resolve(process.cwd(), file), 'utf8')),
    );
    const publicCopy = contents.join('\n');

    expect(publicCopy).not.toMatch(/\b0?7:00\b/);
    expect(publicCopy).toContain('9:00–23:00');
    expect(publicCopy).toContain('с 9:00 до 23:00');
    expect(publicCopy).toContain('"openingHours": "Mo-Su 09:00-23:00"');
  });
});
