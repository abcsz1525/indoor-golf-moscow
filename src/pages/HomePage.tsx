import { Hero } from '../components/Hero';
import { Partners } from '../components/Partners';
import { WhyUs } from '../components/WhyUs';

export function HomePage({ onBooking }: { onBooking: () => void }) {
  return (
    <>
      <Hero onBooking={onBooking} />
      <WhyUs />
      <Partners />
    </>
  );
}
