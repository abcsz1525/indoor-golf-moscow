import { usePageMeta } from '../hooks/usePageMeta';

export function PrivacyPage() {
  usePageMeta(
    'Политика конфиденциальности | Indoor Golf Moscow',
    'Как Indoor Golf Moscow обрабатывает данные, которые посетители передают через формы записи и внешние сервисы.',
    { path: '/privacy' },
  );

  return (
    <div className="page-content">
      <section className="pb-16 md:pb-24">
        <div className="container-x max-w-4xl">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-orange" />
            Данные посетителей
          </div>
          <h1 className="section-title text-brand-orange uppercase">Политика конфиденциальности</h1>
          <p className="mt-6 text-sm text-[var(--text-subtle)]">Редакция от 8 августа 2026 года</p>

          <div className="privacy-content mt-10 space-y-10 text-[var(--text-muted)] leading-relaxed">
            <PolicySection title="1. Кто обрабатывает данные">
              Администрация клуба Indoor Golf Moscow обрабатывает данные, которые посетители добровольно передают через сайт indoor-golf.ru. По вопросам обработки данных и отзыва согласия можно обратиться по телефону <a href="tel:+79260926919">8 (926) 092-69-19</a> или через <a href="https://t.me/indoorgolf" target="_blank" rel="noreferrer">Telegram клуба</a>.
            </PolicySection>
            <PolicySection title="2. Какие данные мы получаем">
              Через формы могут передаваться имя, номер телефона, выбранный способ связи, интересующая услуга и комментарий. Технические данные могут обрабатываться хостингом и подключёнными сервисами в объёме, необходимом для работы сайта и защиты от ошибок.
            </PolicySection>
            <PolicySection title="3. Для чего нужны данные">
              Данные используются, чтобы связаться с посетителем, ответить на вопрос, подобрать услугу, оформить или уточнить запись и обработать обращение. Мы не используем данные из форм для несовместимых с этими целями задач.
            </PolicySection>
            <PolicySection title="4. Кому могут передаваться данные">
              Для обработки обращений сайт использует серверную отправку уведомлений в Telegram. Онлайн-запись может выполняться во внешнем сервисе YClients, который обрабатывает данные по собственным условиям. Техническую обработку также выполняет провайдер хостинга.
            </PolicySection>
            <PolicySection title="5. Срок хранения и защита">
              Данные хранятся не дольше, чем это нужно для обработки обращения, исполнения договорённостей и обязательных требований законодательства. Доступ ограничивается сотрудниками и подрядчиками, которым он нужен для работы с обращением.
            </PolicySection>
            <PolicySection title="6. Права посетителя">
              Посетитель может запросить сведения об обработке, уточнение, блокирование или удаление данных, а также отозвать согласие. Для этого используйте контакты из раздела 1 и укажите номер телефона, который был оставлен в форме.
            </PolicySection>
            <PolicySection title="7. Согласие при отправке формы">
              Нажимая кнопку отправки после установки отметки согласия, посетитель подтверждает, что добровольно передаёт указанные данные для обработки обращения и обратной связи на условиях этой политики.
            </PolicySection>
          </div>
        </div>
      </section>
    </div>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="display text-2xl uppercase text-[var(--text-primary)]">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  );
}
