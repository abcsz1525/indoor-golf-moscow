import { About } from '../components/About';
import { Advantages } from '../components/Advantages';
import { ForWhom } from '../components/ForWhom';
import { Activities } from '../components/Activities';
import { usePageMeta } from '../hooks/usePageMeta';

export function AboutPage() {
  usePageMeta(
    'Indoor Golf Moscow — первый indoor-гольф клуб в России | Лужники',
    'Гольф в помещении круглый год: симуляторы Trackman, тренеры PRO, форматы для новичков, любителей и корпоративов. Лужники, охраняемая парковка. Работаем без выходных.'
  );

  return (
    <div className="page-content">
      <About />
      <Advantages />
      <ForWhom />
      <Activities />
    </div>
  );
}
