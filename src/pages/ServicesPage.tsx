import { Formats } from '../components/Formats';
import { ServicesCTA } from '../components/ServicesCTA';
import { usePageMeta } from '../hooks/usePageMeta';

export function ServicesPage({ onBooking }: { onBooking: (interest?: string) => void }) {
  usePageMeta(
    'Цены на гольф-симулятор в Москве — аренда от 6 000 ₽/час | Indoor Golf Moscow',
    'Аренда гольф-симулятора Trackman в Лужниках — 6 000 ₽/час до 4 человек. Тренировки с PRO от 10 000 ₽, абонементы от 55 000 ₽. Аренда клюшек. Запись за минуту.'
  );

  return (
    <div className="page-content">
      <Formats onBooking={onBooking} headingLevel={1} />
      <ServicesCTA />
    </div>
  );
}
