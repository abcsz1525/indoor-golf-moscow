import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Phone, MessageCircle, Send } from 'lucide-react';
import { Section } from './Section';
import { sendLead } from '../lib/sendLead';

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

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<Channel>('call');
  const nameId = useId();
  const phoneId = useId();
  const commentId = useId();
  const consentId = useId();

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
        channel: CHANNELS.find((c) => c.id === data.channel)?.label ?? data.channel,
        comment: data.comment,
        page: 'Контакты',
        website: data.website,
      });
      setSubmitted(true);
      setSelectedChannel('call');
      reset({ channel: 'call' });
    } catch {
      setError('Не удалось отправить заявку. Позвоните нам: 8 (926) 092-69-19');
    }
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
                role="status"
              >
                <div className="h-14 w-14 rounded-full bg-brand-orange flex items-center justify-center">
                  <Check size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <h3 className="display text-4xl md:text-5xl uppercase text-[var(--text-primary)]">
                  Заявка отправлена
                </h3>
                <p className="text-[var(--text-muted)] max-w-md">
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
                <Field id={nameId} label="Имя" error={errors.name?.message}>
                  <input
                    id={nameId}
                    autoComplete="name"
                    aria-describedby={errors.name ? `${nameId}-error` : undefined}
                    {...register('name', {
                      required: 'Укажите ваше имя',
                      minLength: { value: 2, message: 'Слишком короткое имя' },
                    })}
                    placeholder="Иван Петров"
                    className="input"
                  />
                </Field>

                <Field id={phoneId} label="Телефон" error={errors.phone?.message}>
                  <input
                    id={phoneId}
                    autoComplete="tel"
                    aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
                    {...register('phone', {
                      required: 'Укажите контактный телефон',
                      pattern: {
                        value: /^[\d\s+()-]{7,}$/,
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
                      const active = selectedChannel === c.id;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => {
                            setSelectedChannel(c.id);
                            setValue('channel', c.id);
                          }}
                          className={`px-5 py-3 text-sm uppercase tracking-widest border transition-all duration-200 ${
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
                    placeholder="Желаемая дата, формат, количество человек…"
                    rows={4}
                    className="input resize-none"
                  />
                </Field>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor={`${nameId}-website`}>Не заполняйте это поле</label>
                  <input id={`${nameId}-website`} tabIndex={-1} autoComplete="off" {...register('website')} />
                </div>

                <div>
                  <label htmlFor={consentId} className="flex items-start gap-3 text-xs text-[var(--text-muted)] cursor-pointer max-w-xl">
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

                {error && <p className="text-sm text-brand-orange" role="alert">{error}</p>}

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
              value="8 (926) 092-69-19"
              href="tel:+79260926919"
            />
            <QuickContact
              icon={Send}
              label="Telegram"
              value="@indoorgolf"
              href="https://t.me/indoorgolf"
            />
            <QuickContact
              icon={MessageCircle}
              label="Макс"
              value="8 (926) 092-69-19"
            />
          </div>
          <p className="mt-8 text-sm text-[var(--text-subtle)] leading-relaxed">
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
          border-bottom: 1px solid var(--line);
          padding: 14px 0;
          color: var(--text-primary);
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        .input::placeholder { color: var(--input-placeholder); }
        .input:focus { border-bottom-color: #E35B27; }
      `}</style>
    </Section>
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
      <label htmlFor={id} className="eyebrow block mb-1">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-brand-orange">{error}</p>}
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
  href?: string;
}) {
  const inner = (
    <>
      <span className="h-11 w-11 flex items-center justify-center border border-line group-hover:border-brand-orange transition-colors">
        <Icon size={18} className="text-brand-orange" strokeWidth={1.5} />
      </span>
      <div className="flex-1">
        <div className="eyebrow mb-0.5">{label}</div>
        <div className="text-[var(--text-primary)] group-hover:text-brand-orange transition-colors">
          {value}
        </div>
      </div>
      {href && (
        <ArrowRight
          size={18}
          className="text-[var(--text-subtle)] group-hover:text-brand-orange group-hover:translate-x-1 transition-all"
        />
      )}
    </>
  );

  if (!href) {
    return (
      <div className="group flex items-center gap-5 bg-bg-primary p-5 transition-colors">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="group flex items-center gap-5 bg-bg-primary p-5 hover:bg-bg-card transition-colors"
    >
      {inner}
    </a>
  );
}
