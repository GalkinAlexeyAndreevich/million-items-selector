import { PAGE_SIZE, type ItemsResponse } from '@/entities/item';
import { apiUrl } from '@/shared/api';

type FetchUnselectedItemsParams = {
  offset?: number;
  limit?: number;
  filter?: string;
};

export async function fetchUnselectedItems({
  offset = 0,
  limit = PAGE_SIZE,
  filter = '',
}: FetchUnselectedItemsParams = {}): Promise<ItemsResponse> {
  const params = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
  });

  if (filter) {
    params.set('filter', filter);
  }

  const response = await fetch(`${apiUrl('/api/items/unselected')}?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<ItemsResponse>;
}
