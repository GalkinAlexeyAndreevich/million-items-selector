import { availableItems, itemExists } from './items.js';
import { matchesIdFilter } from './filter.js';
import {
  AlreadySelectedError,
  ItemNotFoundError,
} from './errors.js';
import type { PaginatedIds } from './types.js';

const selectedIds: number[] = [];
const selectedSet = new Set<number>();

export function getSelection(): readonly number[] {
  return selectedIds;
}

export function selectItem(id: number): readonly number[] {
  if (!itemExists(id)) {
    throw new ItemNotFoundError(id);
  }

  if (selectedSet.has(id)) {
    throw new AlreadySelectedError(id);
  }

  selectedIds.push(id);
  selectedSet.add(id);

  return selectedIds;
}

export function getSelectedPage(
  offset: number,
  limit: number,
  filter = '',
): PaginatedIds {
  const filtered = filter
    ? selectedIds.filter((id) => matchesIdFilter(id, filter))
    : selectedIds;

  return {
    items: filtered.slice(offset, offset + limit),
    total: filtered.length,
    offset,
    limit,
  };
}

export function getUnselectedPage(
  offset: number,
  limit: number,
  filter = '',
): PaginatedIds {
  let total = 0;

  for (const id of availableItems) {
    if (selectedSet.has(id)) {
      continue;
    }

    if (!matchesIdFilter(id, filter)) {
      continue;
    }

    total += 1;
  }

  const items: number[] = [];
  let skipped = 0;

  for (const id of availableItems) {
    if (selectedSet.has(id)) {
      continue;
    }

    if (!matchesIdFilter(id, filter)) {
      continue;
    }

    if (skipped < offset) {
      skipped += 1;
      continue;
    }

    if (items.length >= limit) {
      break;
    }

    items.push(id);
  }

  return {
    items,
    total,
    offset,
    limit,
  };
}
