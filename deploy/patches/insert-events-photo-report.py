#!/usr/bin/env python3
"""Вставляет патч «Фотоотчёт турнира» в events.html на бою.

Использование (на сервере, из корня сайта или с путём к файлу):
    python3 insert-events-photo-report.py ~/www/indoor-golf.ru/events.html

Идемпотентно: если блок #ig-photo-report уже есть — ничего не делает.
Перед правкой кладёт рядом резервную копию `events.html.bak-photos` (если её ещё нет).
Патч вставляется ПЕРЕД </body>, после уже стоящего #ig-events-archive.
"""
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
PATCH = HERE / 'events-photo-report.html'
MARKER = 'id="ig-photo-report-js"'


def main(target: str) -> int:
    page = Path(target)
    html = page.read_text(encoding='utf-8')
    if MARKER in html:
        print(f'{page}: патч уже стоит, ничего не меняю')
        return 0
    if '</body>' not in html:
        print(f'{page}: не нашёл </body>', file=sys.stderr)
        return 1
    backup = page.with_name(page.name + '.bak-photos')
    if not backup.exists():
        shutil.copy2(page, backup)
        print(f'бэкап: {backup}')
    patch = PATCH.read_text(encoding='utf-8')
    html = html.replace('</body>', patch.rstrip('\n') + '\n\n  </body>', 1)
    page.write_text(html, encoding='utf-8')
    print(f'{page}: патч вставлен')
    return 0


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
