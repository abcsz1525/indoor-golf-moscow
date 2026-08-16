import { TrackmanTechnology } from '../components/TrackmanTechnology';
import { usePageMeta } from '../hooks/usePageMeta';

export function TechPage() {
  usePageMeta(
    'Trackman iO и Trackman 4 в Москве — технологии ID Golf',
    'ID Golf первым в России установил потолочную систему Trackman iO. Радар, высокоскоростные камеры, мгновенная обработка удара и более 40 параметров Trackman 4.'
  );

  return (
    <div className="page-content">
      <TrackmanTechnology />
    </div>
  );
}
