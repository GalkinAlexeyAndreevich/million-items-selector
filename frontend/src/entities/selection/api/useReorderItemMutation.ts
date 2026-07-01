import { useMutation, useQueryClient } from '@tanstack/react-query';
import { selectedItemsQueryKey } from '@/shared/api/queryKeys';
import { reorderItem } from './reorderItem';

export function useReorderItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: selectedItemsQueryKey });
    },
  });
}
