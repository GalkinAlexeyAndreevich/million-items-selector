import { useMutation, useQueryClient } from '@tanstack/react-query';

import { selectItem } from './selectItem';
import { selectedItemsQueryKey } from './useSelectedInfiniteQuery';
import { unselectedItemsQueryKey } from './useUnselectedInfiniteQuery';

export function useSelectItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: unselectedItemsQueryKey });
      void queryClient.invalidateQueries({ queryKey: selectedItemsQueryKey });
    },
  });
}
