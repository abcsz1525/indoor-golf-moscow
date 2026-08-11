import { TrackmanTechnology } from '../components/TrackmanTechnology';
import { usePageMeta } from '../hooks/usePageMeta';

export function TechPage() {
  usePageMeta(
    'Trackman в Москве — анализ удара и технология PGA Tour | ID Golf',
    'Trackman в ID Golf: два радара, камера и более 40 параметров удара. Тренировки, виртуальные поля, игры и технология, которую использует PGA Tour.'
  );

  return (
    <div className="page-content">
      <TrackmanTechnology />
    </div>
  );
}
