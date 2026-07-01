import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  selectedItemsQueryKey,
  unselectedItemsQueryKey,
} from '@/shared/api/queryKeys';

import { selectItem } from './selectItem';

export function useSelectItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unselectedItemsQueryKey });
      queryClient.invalidateQueries({ queryKey: selectedItemsQueryKey });
    },
  });
}
