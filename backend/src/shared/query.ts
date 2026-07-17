import type { Request } from 'express';

export const PAGE_SIZE = 20;

export function parsePagination(query: Request['query']) {
  const offset = Math.max(0, Number(query.offset) || 0);
  const limit = Math.min(PAGE_SIZE, Math.max(1, Number(query.limit) || PAGE_SIZE));

  return { offset, limit };
}

export function parseFilter(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function parseIdFilter(query: Request['query']): string {
  return parseFilter(query.filter);
}

export function parseId(value: unknown): number | null {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}

/** Absent → null; present but invalid → undefined. */
export function parseOptionalId(value: unknown): number | null | undefined {
  if (value == null || value === '') {
    return null;
  }

  return parseId(value) ?? undefined;
}
