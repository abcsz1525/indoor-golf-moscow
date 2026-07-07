import { Gallery } from '../components/Gallery';
import { usePageMeta } from '../hooks/usePageMeta';

export function GalleryPage() {
  usePageMeta(
    'Фото клуба Indoor Golf Moscow — гольф-симулятор в Лужниках изнутри',
    'Как выглядит игра на гольф-симуляторе Trackman: зал, тренировки и атмосфера клуба Indoor Golf Moscow в Лужниках. Посмотрите пространство до визита.'
  );

  return (
    <div className="page-content">
      <Gallery />
    </div>
  );
}
