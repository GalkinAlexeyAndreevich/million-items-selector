import { useInfiniteQuery } from '@tanstack/react-query';

import { PAGE_SIZE } from '@/entities/item';
import { unselectedItemsQueryKey } from '@/shared/api/queryKeys';

import { fetchUnselectedItems } from './fetchUnselectedItems';

export function useUnselectedInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: unselectedItemsQueryKey,
    queryFn: ({ pageParam }) =>
      fetchUnselectedItems({ offset: pageParam, limit: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.items.length;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
  });
}
