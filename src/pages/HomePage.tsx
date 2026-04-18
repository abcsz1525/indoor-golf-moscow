import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { WhyUs } from '../components/WhyUs';
import { Partners } from '../components/Partners';

export function HomePage({ onBooking }: { onBooking: () => void }) {
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
      <WhyUs />
      <Partners />
    </>
  );
}
