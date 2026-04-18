import { Gallery } from '../components/Gallery';
import { Events } from '../components/Events';

export function GalleryPage() {
  return (
    <div className="pt-28 md:pt-40">
      <Gallery />
      <Events />
    </div>
  );
}
