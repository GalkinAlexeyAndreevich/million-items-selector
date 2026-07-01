export type PaginatedIds = {
  items: number[];
  total: number;
  offset: number;
  limit: number;
};

export type SelectionResponse = {
  ids: number[];
};
