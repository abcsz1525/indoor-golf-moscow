import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface LightboxProps {
  images: LightboxImage[];
  current: number;
  onChange: (index: number) => void;
  onClose: () => void;
  closeLabel?: string;
}

/**
 * Полноэкранный просмотр фотографий: стрелки и Escape на клавиатуре,
 * клик по фону закрывает, прокрутка страницы на время показа блокируется.
 * Рендерить только когда есть что показывать (родитель хранит индекс).
 */
export function Lightbox({ images, current, onChange, onClose, closeLabel = 'Закрыть галерею' }: LightboxProps) {
  const total = images.length;
  const image = images[current];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((current + 1) % total);
      if (event.key === 'ArrowLeft') onChange((current - 1 + total) % total);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [current, total, onChange, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Фото ${current + 1} из ${total}`}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/30 text-white transition-colors hover:border-white md:right-8 md:top-8"
        aria-label={closeLabel}
      >
        <X size={22} />
      </button>

      <button
        type="button"
        onClick={() => onChange((current - 1 + total) % total)}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white transition-colors hover:border-white md:left-8"
        aria-label="Предыдущее фото"
      >
        <ChevronLeft size={24} />
      </button>

      <figure className="flex max-h-full max-w-[min(88rem,calc(100vw-7rem))] flex-col items-center gap-4">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="block max-h-[calc(100dvh-7rem)] max-w-full object-contain"
        />
        <figcaption className="text-center text-sm text-white/70">
          {image.alt} · {current + 1}/{total}
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={() => onChange((current + 1) % total)}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white transition-colors hover:border-white md:right-8"
        aria-label="Следующее фото"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
