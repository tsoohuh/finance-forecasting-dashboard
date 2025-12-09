const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getTransactions() {
  const res = await fetch(`${API_BASE}/api/transactions`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function generateForecast() {
  const res = await fetch(`${API_BASE}/api/forecasts/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'mock-user-1' }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to generate forecast');
  return res.json();
}

export async function getLatestForecast() {
  const res = await fetch(`${API_BASE}/api/forecasts/latest`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch forecast');
  }
  return res.json();
}