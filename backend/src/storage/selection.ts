import { availableItems, itemExists } from './items.js';
import { matchesIdFilter } from './filter.js';
import {
  AlreadySelectedError,
  ItemNotFoundError,
  NotSelectedError,
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

function arrayMove(list: number[], from: number, to: number): number[] {
  const next = list.slice();
  next.splice(to < 0 ? next.length + to : to, 0, next.splice(from, 1)[0]);
  return next;
}

function moveItem(list: number[], activeId: number, overId: number | null): number[] {
  const oldIndex = list.indexOf(activeId);

  if (oldIndex === -1) {
    throw new NotSelectedError(activeId);
  }

  if (overId === null) {
    return arrayMove(list, oldIndex, list.length - 1);
  }

  const newIndex = list.indexOf(overId);

  if (newIndex === -1) {
    throw new NotSelectedError(overId);
  }

  return arrayMove(list, oldIndex, newIndex);
}

export function reorderItem(
  id: number,
  overId: number | null,
  filter = '',
): readonly number[] {
  if (!filter) {
    const reordered = moveItem([...selectedIds], id, overId);
    selectedIds.splice(0, selectedIds.length, ...reordered);
    return selectedIds;
  }

  const filteredIndices: number[] = [];
  const filteredIds: number[] = [];

  for (let index = 0; index < selectedIds.length; index += 1) {
    const itemId = selectedIds[index];

    if (matchesIdFilter(itemId, filter)) {
      filteredIndices.push(index);
      filteredIds.push(itemId);
    }
  }

  const reorderedFiltered = moveItem(filteredIds, id, overId);

  for (let index = 0; index < filteredIndices.length; index += 1) {
    selectedIds[filteredIndices[index]] = reorderedFiltered[index];
  }

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
