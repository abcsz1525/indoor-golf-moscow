import { About } from '../components/About';
import { BrandStory } from '../components/BrandStory';
import { usePageMeta } from '../hooks/usePageMeta';

export function AboutPage() {
  usePageMeta(
    'О нас — идеология и манифест ID Golf',
    'Идеология ID Golf, миссия развивать гольф в России и формировать современную культуру игры.'
  );

  return (
    <div className="page-content">
      <About headingLevel={1} />
      <BrandStory />
    </div>
  );
}
