import { apiUrl } from '@/shared/api';

import type { SelectionResponse } from '../model/types';

async function parseError(response: Response): Promise<never> {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  throw new Error(body?.error ?? `HTTP ${response.status}`);
}

export async function selectItem(id: number): Promise<SelectionResponse> {
  const response = await fetch(apiUrl('/api/selection'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    await parseError(response);
  }

  return response.json() as Promise<SelectionResponse>;
}
