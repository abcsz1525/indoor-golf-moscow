import { Location } from '../components/Location';
import { BookingForm } from '../components/BookingForm';
import { usePageMeta } from '../hooks/usePageMeta';

export function ContactsPage() {
  usePageMeta(
    'Контакты Indoor Golf Moscow — Лужники 24, стр. 21, Москва',
    'Гольф-симулятор в Лужниках: Москва, ул. Лужники 24, стр. 21, Дворец тенниса, блок C. Ежедневно 7:00–23:00. Тел. 8 (926) 092-69-19. Охраняемая парковка на территории.'
  );

  return (
    <div className="page-content">
      <Location headingLevel={1} />
      <BookingForm />
    </div>
  );
}
