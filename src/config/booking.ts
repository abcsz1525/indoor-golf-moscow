// Ссылка на онлайн-запись YClients.
// Где взять: личный кабинет YClients → «Онлайн-запись» → «Ссылки и виджеты» →
// скопировать ссылку на форму записи. Обычно вид:
//   https://n1234567.yclients.com/company/1234567/personal/select-services
//   или короткая  https://yclients.com/company/1234567/booking
//
// Ссылка публичная (не секрет), поэтому хранится прямо в коде.
// Пока стоит плейсхолдер — сайт использует Telegram-форму (см. BookingModal).
//
// Компания в YClients: 1466424 (форма: https://n1466424.yclients.com/company/1466424/).
// Онлайн-запись пока НЕ активирована в кабинете (форма отдаёт «contact receptionist»).
// Когда включат услуги + график — подставить рабочую ссылку сюда.
export const YCLIENTS_URL = '__PASTE_YCLIENTS_URL__';

// YClients включён, если ссылка реально проставлена.
export const yclientsEnabled = (): boolean => YCLIENTS_URL.startsWith('http');

// Сценарии, которые всегда идут в Telegram-форму (нужен живой разговор,
// а не выбор слота): корпоратив и т.п.
export const LEAD_ONLY_INTERESTS = new Set<string>(['Корпоратив']);
