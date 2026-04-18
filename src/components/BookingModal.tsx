import { useState, useRef, type KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Phone, MessageCircle, Send } from 'lucide-react';

function getDigits(value: string): string {
  const all = value.replace(/\D/g, '');
  if (all.startsWith('8') && all.length > 1) return all.slice(1);
  if (all.startsWith('7')) return all.slice(1);
  return all;
}

function formatFromDigits(d: string): string {
  if (d.length === 0) return '';
  let r = '+7 (' + d.slice(0, 3);
  if (d.length >= 3) r += ') ';
  if (d.length > 3) r += d.slice(3, 6);
  if (d.length > 6) r += '-' + d.slice(6, 8);
  if (d.length > 8) r += '-' + d.slice(8, 10);
  return r;
}

type Channel = 'call' | 'telegram' | 'whatsapp';

interface FormValues {
  name: string;
  phone: string;
  channel: Channel;
  comment?: string;
}

const CHANNELS: { id: Channel; label: string }[] = [
  { id: 'call', label: 'Звонок' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'whatsapp', label: 'WhatsApp' },
];

const CHANNEL_LABELS: Record<Channel, string> = {
  call: 'Звонок',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
};

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: { channel: 'call' },
  });

  const selected = watch('channel');

  const onSubmit = async (data: FormValues) => {
    setError('');
    const text = [
      '🏌️ Новая заявка с сайта Indoor Golf Moscow',
      '',
      `👤 Имя: ${data.name}`,
      `📱 Телефон: ${data.phone}`,
      `💬 Способ связи: ${CHANNEL_LABELS[data.channel]}`,
      data.comment ? `📝 Комментарий: ${data.comment}` : '',
    ].filter(Boolean).join('\n');

    try {
      const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TG_CHAT_ID;

      if (botToken && chatId) {
        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
        });
        if (!res.ok) throw new Error('Telegram API error');
      } else {
        console.info('Telegram not configured, logging:', text);
      }

      setSubmitted(true);
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
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-bg-primary border border-line p-6 md:p-8 my-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Закрыть"
            >
              <X size={22} />
            </button>

            <div className="eyebrow mb-1 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-orange" />
              Заявка
            </div>
            <h2 className="display text-3xl text-brand-orange uppercase mb-5">
              Записаться
            </h2>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-full bg-brand-orange flex items-center justify-center">
                    <Check size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="display text-2xl uppercase text-neutral-900">
                    Заявка отправлена
                  </h3>
                  <p className="text-neutral-500 text-sm">
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
                  <Field label="Имя" error={errors.name?.message}>
                    <input
                      {...register('name', {
                        required: 'Укажите ваше имя',
                        minLength: { value: 2, message: 'Слишком короткое имя' },
                      })}
                      placeholder="Иван Петров"
                      className="modal-input"
                    />
                  </Field>

                  <Field label="Телефон" error={errors.phone?.message}>
                    <PhoneInput
                      value={watch('phone') || ''}
                      onChange={(v) => setValue('phone', v, { shouldValidate: !!errors.phone })}
                      error={!!errors.phone}
                    />
                    <input
                      type="hidden"
                      {...register('phone', {
                        required: 'Укажите контактный телефон',
                        validate: (v) => {
                          const d = getDigits(v);
                          return d.length === 10 || 'Введите 10 цифр номера';
                        },
                      })}
                    />
                  </Field>

                  <div>
                    <div className="eyebrow mb-2">Способ связи</div>
                    <div className="flex flex-wrap gap-2">
                      {CHANNELS.map((c) => {
                        const active = selected === c.id;
                        return (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => setValue('channel', c.id)}
                            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-200 ${
                              active
                                ? 'border-brand-orange text-brand-orange bg-brand-orange/10'
                                : 'border-line text-neutral-500 hover:border-neutral-400 hover:text-neutral-900'
                            }`}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field label="Комментарий">
                    <textarea
                      {...register('comment')}
                      placeholder="Желаемая дата, формат…"
                      rows={2}
                      className="modal-input resize-none"
                    />
                  </Field>

                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
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

                  <p className="text-[11px] text-neutral-400">
                    Оставляя заявку, вы соглашаетесь с обработкой персональных данных.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Quick contacts */}
            <div className="mt-5 pt-4 border-t border-line">
              <div className="flex flex-wrap gap-4">
                <a href="tel:+79260926919" className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-brand-orange transition-colors">
                  <Phone size={14} strokeWidth={1.5} className="text-brand-orange" />
                  8 (926) 092-69-19
                </a>
                <a href="https://t.me/+79260926919" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-brand-orange transition-colors">
                  <Send size={14} strokeWidth={1.5} className="text-brand-orange" />
                  Telegram
                </a>
                <a href="https://wa.me/79260926919" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-brand-orange transition-colors">
                  <MessageCircle size={14} strokeWidth={1.5} className="text-brand-orange" />
                  WhatsApp
                </a>
              </div>
            </div>

            <style>{`
              .modal-input {
                width: 100%;
                background: transparent;
                border: none;
                border-bottom: 1px solid #E0E0E0;
                padding: 10px 0;
                color: #1a1a1a;
                font-size: 15px;
                outline: none;
                transition: border-color 0.2s ease;
                font-family: inherit;
              }
              .modal-input::placeholder { color: rgba(0,0,0,0.3); }
              .modal-input:focus { border-bottom-color: #E8471A; }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PhoneInput({ value, onChange }: { value: string; onChange: (v: string) => void; error?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const digitsRef = useRef(getDigits(value));

  const handleInput = () => {
    const input = ref.current;
    if (!input) return;
    const newDigits = getDigits(input.value).slice(0, 10);
    digitsRef.current = newDigits;
    const formatted = formatFromDigits(newDigits);
    input.value = formatted;
    onChange(formatted);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const d = digitsRef.current;
      if (d.length > 0) {
        const newDigits = d.slice(0, -1);
        digitsRef.current = newDigits;
        const formatted = formatFromDigits(newDigits);
        if (ref.current) ref.current.value = formatted;
        onChange(formatted);
      }
    }
  };

  return (
    <input
      ref={ref}
      defaultValue={value}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      placeholder="+7 (___) ___-__-__"
      type="tel"
      inputMode="numeric"
      className="modal-input"
    />
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="eyebrow block mb-0.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-brand-orange">{error}</p>}
    </div>
  );
}
