import { apiUrl } from '@/shared/api';

import type { SelectionResponse } from '../model/types';

type ReorderItemParams = {
  id: number;
  overId: number;
  filter?: string;
};

async function parseError(response: Response): Promise<never> {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  throw new Error(body?.error ?? `HTTP ${response.status}`);
}

export async function reorderItem({
  id,
  overId,
  filter = '',
}: ReorderItemParams): Promise<SelectionResponse> {
  const response = await fetch(apiUrl('/api/selection/order'), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, overId, filter }),
  });

  if (!response.ok) {
    await parseError(response);
  }

  return response.json() as Promise<SelectionResponse>;
}
