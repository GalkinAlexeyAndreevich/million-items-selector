import { DuplicateItemError } from '../../shared/errors.js';
import { paginate, type PaginatedIds } from '../../shared/pagination.js';

export const TOTAL_ITEMS = 1_000_000;

function generateItems(): number[] {
  const items = new Array<number>(TOTAL_ITEMS);

  for (let i = 0; i < TOTAL_ITEMS; i += 1) {
    items[i] = i + 1;
  }

  return items;
}

export const availableItems = generateItems();

export function itemExists(id: number): boolean {
  if (id <= TOTAL_ITEMS) {
    return availableItems[id - 1] === id;
  }

  return availableItems.includes(id);
}

export function addItem(id: number): number {
  if (itemExists(id)) {
    throw new DuplicateItemError(id);
  }

  availableItems.push(id);

  return id;
}

export function getItemsPage(offset: number, limit: number): PaginatedIds {
  return paginate(availableItems, offset, limit);
}
