import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Phone, MessageCircle, Send } from 'lucide-react';
import { Section } from './Section';

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

export function BookingForm() {
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

  return (
    <Section id="booking" eyebrow="Заявка" title="Записаться">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border border-brand-orange bg-brand-orange/5 p-10 md:p-14 flex flex-col items-start gap-5"
              >
                <div className="h-14 w-14 rounded-full bg-brand-orange flex items-center justify-center">
                  <Check size={28} className="text-black" strokeWidth={2.5} />
                </div>
                <h3 className="display text-4xl md:text-5xl uppercase text-white">
                  Заявка отправлена
                </h3>
                <p className="text-white/70 max-w-md">
                  Мы свяжемся с вами в течение 30 минут в рабочее время.
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
                className="space-y-8"
                noValidate
              >
                <Field label="Имя" error={errors.name?.message}>
                  <input
                    {...register('name', {
                      required: 'Укажите ваше имя',
                      minLength: { value: 2, message: 'Слишком короткое имя' },
                    })}
                    placeholder="Иван Петров"
                    className="input"
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
                    className="input"
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
                    rows={4}
                    className="input resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto group disabled:opacity-60"
                >
                  {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="text-xs text-white/45 max-w-md">
                  Оставляя заявку, вы соглашаетесь с обработкой персональных данных.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 lg:col-start-9"
        >
          <div className="eyebrow mb-4">Быстрые контакты</div>
          <div className="space-y-px bg-line">
            <QuickContact
              icon={Phone}
              label="Позвонить"
              value="+7 (495) 000-00-00"
              href="tel:+74950000000"
            />
            <QuickContact
              icon={Send}
              label="Telegram"
              value="@indoorgolfmoscow"
              href="https://t.me/indoorgolfmoscow"
            />
            <QuickContact
              icon={MessageCircle}
              label="WhatsApp"
              value="+7 (495) 000-00-00"
              href="https://wa.me/74950000000"
            />
          </div>
          <p className="mt-8 text-sm text-white/55 leading-relaxed">
            Мы отвечаем в течение 30 минут с 7:00 до 23:00. Бронирование
            симулятора возможно от 1 часа.
          </p>
        </motion.aside>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #1E1E1E;
          padding: 14px 0;
          color: #fff;
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        .input::placeholder { color: rgba(255,255,255,0.35); }
        .input:focus { border-bottom-color: #E8471A; }
      `}</style>
    </Section>
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

function QuickContact({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="group flex items-center gap-5 bg-bg-primary p-5 hover:bg-bg-card transition-colors"
    >
      <span className="h-11 w-11 flex items-center justify-center border border-line group-hover:border-brand-orange transition-colors">
        <Icon size={18} className="text-brand-orange" strokeWidth={1.5} />
      </span>
      <div className="flex-1">
        <div className="eyebrow mb-0.5">{label}</div>
        <div className="text-white group-hover:text-brand-orange transition-colors">
          {value}
        </div>
      </div>
      <ArrowRight
        size={18}
        className="text-white/30 group-hover:text-brand-orange group-hover:translate-x-1 transition-all"
      />
    </a>
  );
}
