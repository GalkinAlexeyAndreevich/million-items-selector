import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchItems } from './fetchItems';
import { PAGE_SIZE } from '../model/constants';

const itemsQueryKey = ['items'] as const;

export function useItemsInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: itemsQueryKey,
    queryFn: ({ pageParam }) => fetchItems({ offset: pageParam, limit: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.items.length;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
  });
}
