import { LegalDocument, LegalSection } from '../components/LegalDocument';
import { COMPANY, LEGAL_REVISION } from '../legal/company';
import { usePageMeta } from '../hooks/usePageMeta';

const DETAILS = [
  ['Полное наименование', COMPANY.fullName],
  ['Сокращённое наименование', COMPANY.shortName],
  ['ИНН', COMPANY.inn],
  ['КПП', COMPANY.kpp],
  ['ОГРН', COMPANY.ogrn],
  ['Юридический адрес', COMPANY.legalAddress],
  ['Генеральный директор', COMPANY.director],
] as const;

export function LegalDetailsPage() {
  usePageMeta(
    'Реквизиты ООО «Гольф Дом» | Indoor Golf Moscow',
    'Юридические реквизиты исполнителя услуг Indoor Golf Moscow.',
    { path: '/legal', noIndex: true },
  );

  return (
    <LegalDocument eyebrow="Исполнитель услуг" title="Юридическая информация" revision={LEGAL_REVISION}>
      <LegalSection title="Реквизиты">
        <dl className="border-t border-line">
          {DETAILS.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
              <dt className="text-sm text-[var(--text-subtle)]">{label}</dt>
              <dd className="text-[var(--text-primary)]">{value}</dd>
            </div>
          ))}
        </dl>
      </LegalSection>

      <LegalSection title="Место оказания услуг и претензии">
        <p>Место оказания услуг: {COMPANY.venueAddress}.</p>
        <p>Адрес для почтовых обращений и претензий: {COMPANY.legalAddress}.</p>
        <p>
          Телефон:{' '}
          <a className="text-brand-orange" href={COMPANY.phoneHref}>
            {COMPANY.phoneDisplay}
          </a>. Режим работы: {COMPANY.hours}.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}

