import { About } from '../components/About';
import { Advantages } from '../components/Advantages';
import { ForWhom } from '../components/ForWhom';
import { Activities } from '../components/Activities';
import { usePageMeta } from '../hooks/usePageMeta';

export function AboutPage() {
  usePageMeta(
    'Indoor Golf Moscow — indoor-гольф клуб в Лужниках',
    'Гольф в помещении круглый год: симуляторы Trackman, тренеры PRO, форматы для новичков, любителей и корпоративов. Лужники, охраняемая парковка. Работаем без выходных.'
  );

  return (
    <div className="page-content">
      <About headingLevel={1} />
      <Advantages />
      <ForWhom />
      <Activities />
    </div>
  );
}
