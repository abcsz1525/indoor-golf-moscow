import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Phone, MessageCircle, Send } from 'lucide-react';

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

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

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
    await new Promise((r) => setTimeout(r, 800));
    console.info('Booking submitted', data);
    setSubmitted(true);
    reset({ channel: 'call' });
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-bg-primary border border-line p-8 md:p-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              aria-label="Закрыть"
            >
              <X size={24} />
            </button>

            <div className="eyebrow mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-orange" />
              Заявка
            </div>
            <h2 className="display text-4xl md:text-5xl text-brand-orange uppercase mb-8">
              Записаться
            </h2>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start gap-5"
                >
                  <div className="h-14 w-14 rounded-full bg-brand-orange flex items-center justify-center">
                    <Check size={28} className="text-black" strokeWidth={2.5} />
                  </div>
                  <h3 className="display text-3xl uppercase text-white">
                    Заявка отправлена
                  </h3>
                  <p className="text-white/70">
                    Мы свяжемся с вами в течение 30 минут.
                    Спасибо, что выбрали Indoor Golf Moscow.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm uppercase tracking-widest text-brand-orange hover:text-brand-orange-hover"
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
                  className="space-y-6"
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
                    <input
                      {...register('phone', {
                        required: 'Укажите контактный телефон',
                        pattern: {
                          value: /^[\d\s+()\-]{7,}$/,
                          message: 'Некорректный номер',
                        },
                      })}
                      placeholder="+7 ___ ___ __ __"
                      type="tel"
                      className="modal-input"
                    />
                  </Field>

                  <div>
                    <div className="eyebrow mb-3">Способ связи</div>
                    <div className="flex flex-wrap gap-3">
                      {CHANNELS.map((c) => {
                        const active = selected === c.id;
                        return (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => setValue('channel', c.id)}
                            className={`px-5 py-3 text-sm uppercase tracking-widest border transition-all duration-200 ${
                              active
                                ? 'border-brand-orange text-brand-orange bg-brand-orange/10'
                                : 'border-line text-white/70 hover:border-white/60 hover:text-white'
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
                      placeholder="Желаемая дата, формат, количество человек…"
                      rows={3}
                      className="modal-input resize-none"
                    />
                  </Field>

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

                  <p className="text-xs text-white/45">
                    Оставляя заявку, вы соглашаетесь с обработкой персональных данных.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Quick contacts */}
            <div className="mt-8 pt-6 border-t border-line">
              <div className="eyebrow mb-3">Быстрые контакты</div>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+74950000000" className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-orange transition-colors">
                  <Phone size={16} strokeWidth={1.5} className="text-brand-orange" />
                  +7 (495) 000-00-00
                </a>
                <a href="https://t.me/indoorgolfmoscow" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-orange transition-colors">
                  <Send size={16} strokeWidth={1.5} className="text-brand-orange" />
                  Telegram
                </a>
                <a href="https://wa.me/74950000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-orange transition-colors">
                  <MessageCircle size={16} strokeWidth={1.5} className="text-brand-orange" />
                  WhatsApp
                </a>
              </div>
            </div>

            <style>{`
              .modal-input {
                width: 100%;
                background: transparent;
                border: none;
                border-bottom: 1px solid #1E1E1E;
                padding: 12px 0;
                color: #fff;
                font-size: 16px;
                outline: none;
                transition: border-color 0.2s ease;
                font-family: inherit;
              }
              .modal-input::placeholder { color: rgba(255,255,255,0.35); }
              .modal-input:focus { border-bottom-color: #E8471A; }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
      <label className="eyebrow block mb-1">{label}</label>
      {children}
      {error && <p className="mt-2 text-xs text-brand-orange">{error}</p>}
    </div>
  );
}
