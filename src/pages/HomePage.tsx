import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { StartHere } from '../components/StartHere';
import { ForWhom } from '../components/ForWhom';
import { Activities } from '../components/Activities';
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
    'Пространство indoor-гольфа в Лужниках. Симулятор Trackman: игра от 6 000 ₽/час на компанию до 4 человек, тренировки с PRO, абонементы. Без выходных 7:00–23:00.'
  );

  return (
    <>
      <Hero onBooking={onBooking} />
      <Marquee speed={25} className="border-line">
        <span className="display">TRACKMAN</span>
        <span className="text-brand-orange">·</span>
        <span className="display">INDOOR GOLF MOSCOW</span>
        <span className="text-brand-orange">·</span>
        <span className="display">ЛУЖНИКИ</span>
        <span className="text-brand-orange">·</span>
        <span className="display">БЕЗ ВЫХОДНЫХ</span>
        <span className="text-brand-orange">·</span>
        <span className="display">PRO LEVEL</span>
        <span className="text-brand-orange">·</span>
        <span className="display">СИМУЛЯТОРЫ</span>
        <span className="text-brand-orange">·</span>
      </Marquee>
      <StartHere onBooking={onBooking} />
      <ForWhom />
      <Activities />
      <TrackMan />
      <PricingTeaser onBooking={onBooking} />
      <PhotoStrip />
      <Partners />
      <FAQ />
      <FinalCTA onBooking={onBooking} />
    </>
  );
}
