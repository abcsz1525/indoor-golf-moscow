export interface Lead {
  name: string;
  phone: string;
  interest?: string;
  channel?: string;
  comment?: string;
  page?: string;
}

// Отправка заявки: сначала через серверный прокси (/api/lead.php на хостинге),
// при его отсутствии (dev, превью) — напрямую в Telegram через env-переменные.
export async function sendLead(lead: Lead): Promise<void> {
  try {
    const res = await fetch('/api/lead.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    // SPA-fallback может вернуть index.html с кодом 200 — проверяем сам JSON
    const json = await res.json().catch(() => null);
    if (json?.ok) return;
    if (json && json.error && json.error !== 'not_configured') {
      throw new Error(json.error);
    }
  } catch {
    // прокси недоступен — пробуем напрямую
  }

  const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TG_CHAT_ID;
  if (!botToken || !chatId) {
    throw new Error('lead channel not configured');
  }

  const lines = [
    '🏌️ Новая заявка с сайта Indoor Golf Moscow',
    '',
    `👤 Имя: ${lead.name}`,
    `📱 Телефон: ${lead.phone}`,
    lead.interest ? `🎯 Интересует: ${lead.interest}` : '',
    lead.channel ? `💬 Способ связи: ${lead.channel}` : '',
    lead.comment ? `📝 Комментарий: ${lead.comment}` : '',
    lead.page ? `📄 Страница: ${lead.page}` : '',
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines.join('\n') }),
  });
  if (!res.ok) throw new Error('Telegram API error');
}
