import { apiUrl } from '@/shared/api';

import type { ItemsResponse } from '../model/types';

export async function fetchItems(): Promise<ItemsResponse> {
  const response = await fetch(apiUrl('/api/items'));

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<ItemsResponse>;
}
