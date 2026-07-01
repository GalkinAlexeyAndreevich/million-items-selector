import { TOTAL_ITEMS } from './constants.js';
import { DuplicateItemError, InvalidItemIdError } from './errors.js';
import type { PaginatedIds } from './types.js';

function generateItems(): number[] {
  const items = new Array<number>(TOTAL_ITEMS);

  for (let i = 0; i < TOTAL_ITEMS; i += 1) {
    items[i] = i + 1;
  }

  return items;
}

export const availableItems = generateItems();

export function itemExists(id: number): boolean {
  if (!Number.isInteger(id) || id < 1) {
    return false;
  }

  if (id <= TOTAL_ITEMS) {
    return availableItems[id - 1] === id;
  }

  return availableItems.includes(id);
}

export function addItem(id: number): number {
  if (!Number.isInteger(id) || id < 1) {
    throw new InvalidItemIdError();
  }

  if (itemExists(id)) {
    throw new DuplicateItemError(id);
  }

  availableItems.push(id);

  return id;
}

export function getItemsPage(offset: number, limit: number): PaginatedIds {
  return {
    items: availableItems.slice(offset, offset + limit),
    total: availableItems.length,
    offset,
    limit,
  };
}
