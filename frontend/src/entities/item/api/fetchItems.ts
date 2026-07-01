import { apiUrl } from '@/shared/api';

import { PAGE_SIZE } from '../model/constants';
import type { ItemsResponse } from '../model/types';

type FetchItemsParams = {
  offset?: number;
  limit?: number;
};

export async function fetchItems({
  offset = 0,
  limit = PAGE_SIZE,
}: FetchItemsParams = {}): Promise<ItemsResponse> {
  const params = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
  });

  const response = await fetch(`${apiUrl('/api/items')}?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<ItemsResponse>;
}
