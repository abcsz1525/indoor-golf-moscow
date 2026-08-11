import { About } from '../components/About';
import { BrandStory } from '../components/BrandStory';
import { Founders } from '../components/Founders';
import { usePageMeta } from '../hooks/usePageMeta';

export function AboutPage() {
  usePageMeta(
    'О нас — Андрей Золотарев и Наталья Колыхалова, основатели ID Golf',
    'ID Golf создали Андрей Золотарев и Наталья Колыхалова. Узнайте об идеологии проекта, миссии развивать гольф в России и современной культуре гольфа.'
  );

  return (
    <div className="page-content">
      <About headingLevel={1} />
      <Founders />
      <BrandStory />
    </div>
  );
}
