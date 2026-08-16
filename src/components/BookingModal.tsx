import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendLead } from '../lib/sendLead';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Phone, MessageCircle, Send } from 'lucide-react';
import { useDialog } from '../hooks/useDialog';
import { CONSENT_VERSION } from '../legal/company';
import { PersonalDataConsent } from './PersonalDataConsent';

type Channel = 'call' | 'telegram' | 'max';

interface FormValues {
  name: string;
  phone: string;
  channel: Channel;
  comment?: string;
  consent: boolean;
  website?: string;
}

const CHANNELS: { id: Channel; label: string }[] = [
  { id: 'call', label: 'Звонок' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'max', label: 'Макс' },
];

const CHANNEL_LABELS: Record<Channel, string> = {
  call: 'Звонок',
  telegram: 'Telegram',
  max: 'Макс',
};

const INTERESTS = [
  'Первый раз',
  'Игра на симуляторе',
  'Тренировка с PRO',
  'Корпоратив',
  'Абонемент',
] as const;

export function BookingModal({
  open,
  interest,
  onClose,
}: {
  open: boolean;
  interest?: string;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedInterest, setSelectedInterest] = useState(interest ?? '');
  const [selectedChannel, setSelectedChannel] = useState<Channel>('call');
  const titleId = useId();
  const descriptionId = useId();
  const nameId = useId();
  const phoneId = useId();
  const commentId = useId();
  const consentId = useId();
  const dialogRef = useDialog(open, onClose);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: { channel: 'call' },
  });

  const onSubmit = async (data: FormValues) => {
    setError('');
    try {
      await sendLead({
        name: data.name,
        phone: data.phone,
        interest: selectedInterest || undefined,
        channel: CHANNEL_LABELS[data.channel],
        comment: data.comment,
        page: window.location.pathname,
        website: data.website,
        consent: {
          accepted: true,
          version: CONSENT_VERSION,
          acceptedAt: new Date().toISOString(),
        },
      });
      setSubmitted(true);
      setSelectedChannel('call');
      reset({ channel: 'call' });
    } catch {
      setError('Не удалось отправить заявку. Позвоните нам: 8 (926) 092-69-19');
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-6 md:py-10"
        >
          <div className="fixed inset-0 bg-black/60" onClick={handleClose} />

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
            className="relative my-auto w-full max-w-lg border border-line bg-bg-primary p-7 md:p-10"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-line text-[var(--text-subtle)] transition-colors hover:border-brand-orange hover:text-brand-orange"
              aria-label="Закрыть"
            >
              <X size={22} />
            </button>

            <div className="eyebrow mb-3 text-brand-orange">Заявка</div>
            <h2 id={titleId} className="pr-12 text-4xl font-light tracking-[-0.04em] text-[var(--text-primary)] md:text-5xl">
              Записаться
            </h2>
            <p id={descriptionId} className="mb-7 mt-4 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              Оставьте контакты, и администратор поможет подобрать время и формат.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start gap-4"
                  role="status"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-brand-orange">
                    <Check size={24} className="text-neutral-950" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl font-light tracking-[-0.03em] text-[var(--text-primary)]">
                    Заявка отправлена
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm">
                    Мы свяжемся с вами в течение 30 минут в рабочее время.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-brand-orange hover:text-brand-orange-hover"
                  >
                    Отправить ещё одну →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                  noValidate
                >
                  <Field id={nameId} label="Имя" error={errors.name?.message}>
                    <input
                      id={nameId}
                      aria-describedby={errors.name ? `${nameId}-error` : undefined}
                      autoComplete="name"
                      {...register('name', {
                        required: 'Укажите ваше имя',
                        minLength: { value: 2, message: 'Слишком короткое имя' },
                      })}
                      placeholder="Иван Петров"
                      className="modal-input"
                    />
                  </Field>

                  <Field id={phoneId} label="Телефон" error={errors.phone?.message}>
                    <input
                      id={phoneId}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 (___) ___-__-__"
                      aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
                      className="modal-input"
                      {...register('phone', {
                        required: 'Укажите контактный телефон',
                        validate: (v) => {
                          const digits = v.replace(/\D/g, '');
                          return (digits.length === 10 || digits.length === 11) || 'Введите корректный номер';
                        },
                      })}
                    />
                  </Field>

                  <div>
                    <div className="eyebrow mb-2">Что вас интересует</div>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((item) => {
                        const active = selectedInterest === item;
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => setSelectedInterest(active ? '' : item)}
                            className={`min-h-11 border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                              active
                                ? 'border-brand-orange text-brand-orange bg-brand-orange/10'
                                : 'border-line text-[var(--text-muted)] hover:border-neutral-400 hover:text-[var(--text-primary)]'
                            }`}
                            aria-pressed={active}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="eyebrow mb-2">Способ связи</div>
                    <div className="flex flex-wrap gap-2">
                      {CHANNELS.map((c) => {
                        const active = selectedChannel === c.id;
                        return (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => {
                              setSelectedChannel(c.id);
                              setValue('channel', c.id);
                            }}
                            className={`min-h-11 border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                              active
                                ? 'border-brand-orange text-brand-orange bg-brand-orange/10'
                                : 'border-line text-[var(--text-muted)] hover:border-neutral-400 hover:text-[var(--text-primary)]'
                            }`}
                            aria-pressed={active}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field id={commentId} label="Комментарий">
                    <textarea
                      id={commentId}
                      {...register('comment')}
                      placeholder="Желаемая дата, формат…"
                      rows={2}
                      className="modal-input resize-none"
                    />
                  </Field>

                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor={`${nameId}-website`}>Не заполняйте это поле</label>
                    <input
                      id={`${nameId}-website`}
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('website')}
                    />
                  </div>

                  <PersonalDataConsent
                    id={consentId}
                    error={errors.consent?.message}
                    inputProps={register('consent', {
                      required: 'Подтвердите согласие на обработку данных',
                    })}
                  />

                  {error && (
                    <p className="text-sm text-red-600" role="alert">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full group disabled:opacity-60"
                  >
                    {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-5 pt-4 border-t border-line">
              <div className="flex flex-wrap gap-4">
                <a href="tel:+79260926919" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-brand-orange transition-colors">
                  <Phone size={14} strokeWidth={1.5} className="text-brand-orange" />
                  8 (926) 092-69-19
                </a>
                <a href="https://t.me/indoorgolf" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-brand-orange transition-colors">
                  <Send size={14} strokeWidth={1.5} className="text-brand-orange" />
                  Telegram
                </a>
                <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <MessageCircle size={14} strokeWidth={1.5} className="text-brand-orange" />
                  Макс
                </span>
              </div>
            </div>

            <style>{`
              .modal-input {
                width: 100%;
                background: transparent;
                border: none;
                border-bottom: 1px solid var(--line);
                padding: 10px 0;
                color: var(--text-primary);
                font-size: 15px;
                outline: none;
                transition: border-color 0.2s ease;
                font-family: inherit;
              }
              .modal-input::placeholder { color: var(--input-placeholder); }
              .modal-input:focus { border-bottom-color: #E35B27; }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block mb-0.5">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-brand-orange">{error}</p>}
    </div>
  );
}
