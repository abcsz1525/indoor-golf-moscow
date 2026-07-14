// Ссылка на онлайн-запись YClients.
// Где взять: личный кабинет YClients → «Онлайн-запись» → «Ссылки и виджеты» →
// скопировать ссылку на форму записи. Обычно вид:
//   https://n1234567.yclients.com/company/1234567/personal/select-services
//   или короткая  https://yclients.com/company/1234567/booking
//
// Ссылка публичная (не секрет), поэтому хранится прямо в коде.
// Компания в YClients: 1466424, форма на поддомене n1632762.
// Базовый адрес редиректит на выбор услуг с брендингом Indoor Golf.
export const YCLIENTS_URL = 'https://n1632762.yclients.com/';

// YClients включён, если ссылка реально проставлена.
export const yclientsEnabled = (): boolean => YCLIENTS_URL.startsWith('http');

// Сценарии, которые всегда идут в Telegram-форму (нужен живой разговор,
// а не выбор слота): корпоратив и т.п.
export const LEAD_ONLY_INTERESTS = new Set<string>(['Корпоратив']);
