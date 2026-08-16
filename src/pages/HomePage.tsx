import { Hero } from '../components/Hero';
import { StartHere } from '../components/StartHere';
import { TrackMan } from '../components/TrackMan';
import { PricingTeaser } from '../components/PricingTeaser';
import { PhotoStrip } from '../components/PhotoStrip';
import { Partners } from '../components/Partners';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';
import { usePageMeta } from '../hooks/usePageMeta';

export function HomePage({ onBooking }: { onBooking: (interest?: string) => void }) {
  usePageMeta(
    'Гольф-симулятор Trackman в Москве — Indoor Golf Moscow, Лужники',
    'Пространство indoor-гольфа в Лужниках. Симулятор Trackman: игра от 6 000 ₽/час на компанию до 4 человек, тренировки с PRO, абонементы. Без выходных 9:00–23:00.'
  );

  return (
    <>
      <Hero onBooking={onBooking} />
      <StartHere onBooking={onBooking} />
      <TrackMan />
      <PricingTeaser onBooking={onBooking} />
      <PhotoStrip />
      <Partners />
      <FAQ />
      <FinalCTA onBooking={onBooking} />
    </>
  );
}
