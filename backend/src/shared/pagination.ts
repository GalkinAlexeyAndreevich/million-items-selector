export type PaginatedIds = {
  items: number[];
  total: number;
  offset: number;
  limit: number;
};

export function paginate(
  items: readonly number[],
  offset: number,
  limit: number,
): PaginatedIds {
  return {
    items: items.slice(offset, offset + limit),
    total: items.length,
    offset,
    limit,
  };
}
