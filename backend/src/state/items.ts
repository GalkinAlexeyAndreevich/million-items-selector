import { TOTAL_ITEMS } from './constants.js';
import type { PaginatedIds } from './types.js';

function generateItems(): number[] {
  const items = new Array<number>(TOTAL_ITEMS);

  for (let i = 0; i < TOTAL_ITEMS; i += 1) {
    items[i] = i + 1;
  }

  return items;
}

export const availableItems = generateItems();

export function getItemsPage(offset: number, limit: number): PaginatedIds {
  return {
    items: availableItems.slice(offset, offset + limit),
    total: availableItems.length,
    offset,
    limit,
  };
}
