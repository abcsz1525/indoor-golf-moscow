import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Phone } from 'lucide-react';
import { YCLIENTS_URL } from '../config/booking';
import { useDialog } from '../hooks/useDialog';

// Модалка онлайн-записи YClients: показывает виджет с выбором свободных окон
// прямо на сайте (iframe). Если виджет не загрузился — есть кнопка открыть в
// новой вкладке и ссылка на обычную заявку (Telegram-форму).
export function YClientsModal({
  open,
  onClose,
  onLeadFallback,
}: {
  open: boolean;
  onClose: () => void;
  onLeadFallback: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useDialog(open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
        >
          <div className="fixed inset-0 bg-black/60" onClick={onClose} />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl h-[85vh] bg-bg-primary border border-line flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line">
              <div>
                <div className="eyebrow mb-1 text-brand-orange">Онлайн-запись</div>
                <h2 id={titleId} className="text-2xl font-light tracking-[-0.03em] text-[var(--text-primary)] md:text-3xl">
                  Выберите время
                </h2>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={YCLIENTS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-[var(--text-subtle)] hover:text-brand-orange transition-colors"
                  aria-label="Открыть в новой вкладке"
                  title="Открыть в новой вкладке"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Закрыть"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-white" aria-busy={!loaded}>
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-neutral-500">
                  <span className="h-8 w-8 rounded-full border-2 border-brand-orange border-t-transparent animate-spin" />
                  <span className="text-sm">Загружаем свободные окна…</span>
                </div>
              )}
              <iframe
                title="Онлайн-запись YClients"
                src={YCLIENTS_URL}
                className="w-full h-full border-0"
                onLoad={() => setLoaded(true)}
                allow="payment"
              />
            </div>

            <div id={descriptionId} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 border-t border-line text-xs text-[var(--text-muted)]">
              <a
                href="tel:+79260926919"
                className="flex items-center gap-1.5 hover:text-brand-orange transition-colors"
              >
                <Phone size={13} strokeWidth={1.5} className="text-brand-orange" />
                8 (926) 092-69-19
              </a>
              <button
                onClick={onLeadFallback}
                className="inline-flex min-h-11 items-center font-medium text-brand-orange transition-colors hover:text-brand-orange-hover"
              >
                Корпоратив или вопрос? Оставить заявку →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
