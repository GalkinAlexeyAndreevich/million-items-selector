import { apiUrl } from '@/shared/api';

type AddItemResponse = {
  id: number;
};

async function parseError(response: Response): Promise<never> {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  throw new Error(body?.error ?? `HTTP ${response.status}`);
}

export async function addItem(id: number): Promise<AddItemResponse> {
  const response = await fetch(apiUrl('/api/items'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    await parseError(response);
  }

  return response.json() as Promise<AddItemResponse>;
}
