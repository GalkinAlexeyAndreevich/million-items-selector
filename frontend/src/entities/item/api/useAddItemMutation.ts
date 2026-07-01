import { useMutation, useQueryClient } from '@tanstack/react-query';

import { unselectedItemsQueryKey } from '@/shared/api/queryKeys';

import { addItem } from './addItem';

export function useAddItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unselectedItemsQueryKey });
    },
  });
}
