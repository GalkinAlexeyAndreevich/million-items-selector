import type { Request } from 'express';

import { PAGE_SIZE } from '../storage/index.js';

export function parsePagination(query: Request['query']) {
  const offset = Math.max(0, Number(query.offset) || 0);
  const limit = Math.min(PAGE_SIZE, Math.max(1, Number(query.limit) || PAGE_SIZE));

  return { offset, limit };
}

export function parseIdFilter(query: Request['query']): string {
  const filter = query.filter;

  if (typeof filter !== 'string') {
    return '';
  }

  return filter.trim();
}

export function parseIdParam(value: string): number | null {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}
