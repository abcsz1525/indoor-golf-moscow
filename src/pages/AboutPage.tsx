import { About } from '../components/About';
import { Founders } from '../components/Founders';
import { usePageMeta } from '../hooks/usePageMeta';

export function AboutPage() {
  usePageMeta(
    'О нас — идеология и основатели ID Golf | Indoor Golf Moscow',
    'ID означает Identity — идентичность. Узнайте об идеологии ID Golf, нашей миссии развивать гольф в России и основателях проекта.'
  );

  return (
    <div className="page-content">
      <About headingLevel={1} />
      <Founders />
    </div>
  );
}
