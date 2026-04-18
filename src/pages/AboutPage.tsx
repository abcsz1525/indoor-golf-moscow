import { About } from '../components/About';
import { Advantages } from '../components/Advantages';
import { ForWhom } from '../components/ForWhom';
import { Activities } from '../components/Activities';

export function AboutPage() {
  return (
    <div className="pt-24">
      <About />
      <Advantages />
      <ForWhom />
      <Activities />
    </div>
  );
}
