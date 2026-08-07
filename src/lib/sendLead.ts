export interface Lead {
  name: string;
  phone: string;
  interest?: string;
  channel?: string;
  comment?: string;
  page?: string;
  website?: string;
}

export async function sendLead(lead: Lead): Promise<void> {
  const res = await fetch('/api/lead.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || json?.ok !== true) {
    throw new Error(json?.error || 'lead delivery failed');
  }
}
