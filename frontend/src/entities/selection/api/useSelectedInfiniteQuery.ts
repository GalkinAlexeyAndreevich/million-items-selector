import { useInfiniteQuery } from '@tanstack/react-query';

import { PAGE_SIZE } from '@/entities/item';
import { selectedItemsQueryKey } from '@/shared/api/queryKeys';

import { fetchSelectedItems } from './fetchSelectedItems';

export function useSelectedInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: selectedItemsQueryKey,
    queryFn: ({ pageParam }) =>
      fetchSelectedItems({ offset: pageParam, limit: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.items.length;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
  });
}
