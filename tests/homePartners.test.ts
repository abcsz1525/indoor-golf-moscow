import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);

describe('partner placement', () => {
  it('keeps YMEL Group off public pages while the tournament section is paused', async () => {
    const [homePartners, invitational] = await Promise.all([
      readFile(resolve(process.cwd(), 'src', 'components', 'Partners.tsx'), 'utf8'),
      readFile(resolve(process.cwd(), 'public', 'invitational', 'index.html'), 'utf8'),
    ]);

    expect(homePartners).not.toContain('YMEL Group');
    expect(homePartners).not.toContain('golfstore.by');
    expect(invitational).not.toContain('YMEL Group');
    expect(invitational).not.toContain('golfstore.by');
  });

  it('removes the restored YMEL card without leaving an extra closing token', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'idgolf-ymel-bundle-'));
    const sourcePath = join(tempDir, 'source.js');
    const outputPath = join(tempDir, 'output.js');
    const source =
      'before(0,Q.jsxs)(y.a,{href:`https://golfstore.by/`,children:[]})]})]})})}var Ye=after';

    try {
      await writeFile(sourcePath, source);
      await execFileAsync(process.execPath, [
        resolve(process.cwd(), 'scripts', 'remove-ymel-from-restored-home.mjs'),
        sourcePath,
        outputPath,
      ]);

      await expect(readFile(outputPath, 'utf8')).resolves.toBe('before]})})}var Ye=after');
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});
