import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFoundPage() {
  usePageMeta(
    'Страница не найдена | Indoor Golf Moscow',
    'Запрошенная страница не найдена. Вернитесь на главную Indoor Golf Moscow.',
    { noIndex: true },
  );

  return (
    <div className="page-content min-h-[70vh] flex items-center">
      <section className="container-x py-16">
        <div className="eyebrow mb-4">Ошибка 404</div>
        <h1 className="section-title text-brand-orange uppercase">Страница не найдена</h1>
        <p className="mt-6 max-w-xl text-lg text-[var(--text-muted)]">
          Такой страницы нет или её адрес изменился. Перейдите на главную или позвоните нам,
          если искали запись в клуб.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/" className="btn-primary"><ArrowLeft size={18} />На главную</Link>
          <a href="tel:+79260926919" className="btn-outline">8 (926) 092-69-19</a>
        </div>
      </section>
    </div>
  );
}
