import { useRef } from 'react';
import { createRequestQueue } from '@/shared/lib/requestQueue';
import { useSelectItemMutation } from './useSelectItemMutation';

export function useSelectItemQueue() {
  const mutation = useSelectItemMutation();
  const queueRef = useRef(createRequestQueue<number>());

  const select = (id: number) => {
    queueRef.current.enqueue(id, () => mutation.mutateAsync(id));
  };

  return {
    select,
    error: mutation.error,
  };
}
