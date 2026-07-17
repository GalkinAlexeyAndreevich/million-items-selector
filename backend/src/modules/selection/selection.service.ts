import { availableItems, itemExists } from '../catalog/catalog.service.js';
import {
  AlreadySelectedError,
  ItemNotFoundError,
  NotSelectedError,
} from '../../shared/errors.js';
import { matchesIdFilter } from '../../shared/filter.js';
import { paginate, type PaginatedIds } from '../../shared/pagination.js';

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
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function moveItem(list: number[], activeId: number, overId: number | null): number[] {
  const from = list.indexOf(activeId);

  if (from === -1) {
    throw new NotSelectedError(activeId);
  }

  const to = overId === null ? list.length - 1 : list.indexOf(overId);

  if (to === -1) {
    throw new NotSelectedError(overId as number);
  }

  return arrayMove(list, from, to);
}

export function reorderItem(
  id: number,
  overId: number | null,
  filter = '',
): readonly number[] {
  // Собираем позиции и значения элементов, попадающих под фильтр
  const filteredIndexes: number[] = [];
  const filteredIds: number[] = [];

  selectedIds.forEach((itemId, index) => {
    if (matchesIdFilter(itemId, filter)) {
      filteredIndexes.push(index);
      filteredIds.push(itemId);
    }
  });

  const reordered = moveItem(filteredIds, id, overId);

  // Раскладываем переупорядоченные элементы в хранилище selectedIds
  filteredIndexes.forEach((index, i) => {
    selectedIds[index] = reordered[i];
  });

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

  return paginate(filtered, offset, limit);
}

export function getUnselectedPage(
  offset: number,
  limit: number,
  filter = '',
): PaginatedIds {
  const items: number[] = [];
  let total = 0;

  // не используется paginate, чтобы не проходиться по миллиону элементов
  for (const id of availableItems) {
    if (selectedSet.has(id) || !matchesIdFilter(id, filter)) {
      continue;
    }

    if (total >= offset && items.length < limit) {
      items.push(id);
    }

    total += 1;
  }

  return {
    items,
    total,
    offset,
    limit,
  };
}
