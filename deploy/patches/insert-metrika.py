#!/usr/bin/env python3
"""Вставляет счётчик Яндекс.Метрики во все страницы сайта.

Использование (на сервере, из корня сайта):
    python3 insert-metrika.py <номер счётчика> *.html

Идемпотентно: если счётчик уже стоит — файл не трогается.
Перед правкой кладёт рядом резервную копию `<имя>.bak-metrika` (если её ещё нет).
Код вставляется перед </body>, после уже стоящих патчей.

Снять счётчик: восстановить файлы из *.bak-metrika.
"""
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
PATCH = HERE / 'metrika.html'
MARKER = 'id="ig-metrika"'


def main(counter_id, targets):
    if not counter_id.isdigit():
        print(f'номер счётчика должен быть числом, получено: {counter_id}', file=sys.stderr)
        return 2
    patch = PATCH.read_text(encoding='utf-8').replace('__METRIKA_ID__', counter_id)

    touched = skipped = 0
    for target in targets:
        page = Path(target)
        html = page.read_text(encoding='utf-8')
        if MARKER in html:
            print(f'{page.name}: счётчик уже стоит')
            skipped += 1
            continue
        if '</body>' not in html:
            print(f'{page.name}: не нашёл </body>, пропускаю', file=sys.stderr)
            continue
        backup = page.with_name(page.name + '.bak-metrika')
        if not backup.exists():
            shutil.copy2(page, backup)
        page.write_text(html.replace('</body>', patch.rstrip('\n') + '\n\n  </body>', 1), encoding='utf-8')
        print(f'{page.name}: счётчик {counter_id} вставлен')
        touched += 1

    print(f'итого: изменено {touched}, пропущено {skipped}')
    return 0


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1], sys.argv[2:]))
