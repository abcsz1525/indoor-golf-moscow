import { Link } from 'react-router-dom';
import { LegalDocument, LegalNotice, LegalSection } from '../components/LegalDocument';
import { usePageMeta } from '../hooks/usePageMeta';

export function TournamentRulesPage() {
  usePageMeta(
    'Турнирные документы обновляются | Indoor Golf Moscow',
    'Раздел с условиями участия временно недоступен: программа и площадка события уточняются.',
    { path: '/tournament-rules', noIndex: true },
  );

  return (
    <LegalDocument eyebrow="Турнирные документы" title="Раздел обновляется">
      <LegalNotice>
        Сейчас мы уточняем программу и площадку события. Актуальные условия опубликуем после
        подтверждения всех деталей.
      </LegalNotice>

      <LegalSection title="Информация появится позже">
        <p>
          Пожалуйста, следите за обновлениями на сайте. До публикации новой версии сведения из
          прежних материалов считать неактуальными.
        </p>
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange-hover"
        >
          Вернуться на главную
        </Link>
      </LegalSection>
    </LegalDocument>
  );
}
