export type ItemId = number;

export type ItemsResponse = {
  items: ItemId[];
  total: number;
  offset: number;
  limit: number;
};
