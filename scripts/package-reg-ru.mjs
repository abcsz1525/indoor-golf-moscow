import { access, mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const distDir = resolve(projectRoot, 'dist');
const artifactsDir = resolve(projectRoot, 'artifacts');
const archivePath = resolve(artifactsDir, 'indoor-golf-reg-ru.tar.gz');

await Promise.all([
  access(resolve(distDir, 'index.html')),
  access(resolve(distDir, '.htaccess')),
  access(resolve(distDir, '404.html')),
  access(resolve(distDir, 'api', 'lead.php')),
  access(resolve(distDir, 'api', 'yclients-webhook.php')),
  access(resolve(distDir, 'api', '_server-config.php')),
]);

await mkdir(artifactsDir, { recursive: true });
await rm(archivePath, { force: true });

const result = spawnSync('tar', ['-czf', archivePath, '-C', distDir, '.'], {
  stdio: 'inherit',
});

if (result.status !== 0) {
  throw new Error(`Не удалось создать REG.RU archive (tar exit ${result.status ?? 'unknown'})`);
}

console.log(`REG.RU archive: ${archivePath}`);

