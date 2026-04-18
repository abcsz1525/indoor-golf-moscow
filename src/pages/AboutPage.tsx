import { About } from '../components/About';
import { Advantages } from '../components/Advantages';
import { ForWhom } from '../components/ForWhom';
import { Activities } from '../components/Activities';

export function AboutPage() {
  return (
    <div className="pt-28 md:pt-40">
      <About />
      <Advantages />
      <ForWhom />
      <Activities />
    </div>
  );
}
