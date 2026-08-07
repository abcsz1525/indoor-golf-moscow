import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendLead } from '../lib/sendLead';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Phone, MessageCircle, Send } from 'lucide-react';
import { useDialog } from '../hooks/useDialog';

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
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-8 px-4"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-bg-primary border border-line p-6 md:p-8 my-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Закрыть"
            >
              <X size={22} />
            </button>

            <div className="eyebrow mb-1 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-orange" />
              Заявка
            </div>
            <h2 id={titleId} className="display text-3xl text-brand-orange uppercase mb-2">
              Записаться
            </h2>
            <p id={descriptionId} className="mb-5 text-sm text-[var(--text-muted)]">
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
                  <div className="h-12 w-12 rounded-full bg-brand-orange flex items-center justify-center">
                    <Check size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="display text-2xl uppercase text-[var(--text-primary)]">
                    Заявка отправлена
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm">
                    Мы свяжемся с вами в течение 30 минут.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm uppercase tracking-widest text-brand-orange hover:text-brand-orange-hover"
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
                            className={`px-3 py-2 text-xs uppercase tracking-wider border transition-all duration-200 ${
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
                            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-200 ${
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

                  <div>
                    <label htmlFor={consentId} className="flex items-start gap-3 text-xs text-[var(--text-muted)] cursor-pointer">
                      <input
                        id={consentId}
                        type="checkbox"
                        className="mt-0.5 accent-[#E35B27]"
                        aria-describedby={errors.consent ? `${consentId}-error` : undefined}
                        {...register('consent', { required: 'Подтвердите согласие на обработку данных' })}
                      />
                      <span>
                        Я принимаю <a href="/privacy" target="_blank" rel="noreferrer" className="text-brand-orange underline underline-offset-2">политику конфиденциальности</a> и даю согласие на обработку данных для ответа на заявку.
                      </span>
                    </label>
                    {errors.consent && <p id={`${consentId}-error`} role="alert" className="mt-2 text-xs text-brand-orange">{errors.consent.message}</p>}
                  </div>

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

            {/* Quick contacts */}
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
