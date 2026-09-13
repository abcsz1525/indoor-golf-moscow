import { useId, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Lightbox } from './Lightbox';
import type { EventAlbum, EventPhoto } from '../data/invitational2026Photos';

interface EventPhotoReportProps {
  photos: EventPhoto[];
  albums: EventAlbum[];
  title?: string;
  description?: string;
}

/**
 * Фотоотчёт прошедшего события: сетка отобранных кадров с лайтбоксом,
 * и ссылки на полные архивы фотографов. Переиспользуется для
 * следующих событий — данные приходят пропсами.
 */
export function EventPhotoReport({
  photos,
  albums,
  title = 'Как это было',
  description,
}: EventPhotoReportProps) {
  const [current, setCurrent] = useState<number | null>(null);
  const id = useId();
  const eyebrowId = `${id}-eyebrow`;
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={`${eyebrowId} ${headingId}`} className="mt-14 md:mt-20">
      <div className="mb-8 md:mb-10">
        <div id={eyebrowId} className="eyebrow mb-3 text-brand-orange">Фотоотчёт</div>
        <h3 id={headingId} className="font-display text-3xl uppercase leading-none tracking-wide text-[var(--text-primary)] md:text-4xl">
          {title}
        </h3>
        {description && (
          <p className="mt-4 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{description}</p>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4" aria-label="Фотографии события">
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setCurrent(index)}
              className="group block w-full overflow-hidden border border-line bg-bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
              aria-label={`Открыть фото ${index + 1}: ${photo.alt}`}
              aria-haspopup="dialog"
            >
              <img
                src={photo.thumb}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="block aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap justify-end gap-x-8 gap-y-2 border-t border-line pt-5 text-sm">
        {albums.map((album) => (
          <a
            key={album.url}
            href={album.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 font-medium text-brand-orange transition-colors hover:text-brand-orange-hover"
          >
            {album.label} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ))}
      </div>

      {current !== null && (
        <Lightbox
          images={photos}
          current={current}
          onChange={setCurrent}
          onClose={() => setCurrent(null)}
          closeLabel="Закрыть фотоотчёт"
        />
      )}
    </section>
  );
}
