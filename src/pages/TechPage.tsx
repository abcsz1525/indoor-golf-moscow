import { TrackMan } from '../components/TrackMan';
import { Advantages } from '../components/Advantages';
import { usePageMeta } from '../hooks/usePageMeta';

export function TechPage() {
  usePageMeta(
    'Симулятор Trackman в Москве — технология игроков PGA Tour | Indoor Golf Moscow',
    'Гольф-симулятор Trackman: точный анализ удара — скорость мяча, угол вылета, спин, дистанция. 150+ полей мира в HD. Тренируйтесь на технологии мирового тура в Лужниках.'
  );

  return (
    <div className="page-content">
      <TrackMan headingLevel={1} />
      <Advantages />
    </div>
  );
}
