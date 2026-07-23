import { useRef } from 'react';
import { createRequestQueue } from '@/shared/lib/requestQueue';
import { useAddItemMutation } from './useAddItemMutation';

type AddOptions = {
  onSuccess?: () => void;
};

export function useAddItemQueue() {
  const mutation = useAddItemMutation();
  const queueRef = useRef(createRequestQueue<number>());

  const add = (id: number, options?: AddOptions) => {
    queueRef.current.enqueue(id, async () => {
      await mutation.mutateAsync(id);
      options?.onSuccess?.();
    });
  };

  return {
    add,
    reset: mutation.reset,
    error: mutation.error,
    isPending: mutation.isPending,
  };
}
