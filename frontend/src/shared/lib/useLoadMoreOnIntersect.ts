import { useEffect, useRef } from 'react';

type Props = {
  root: HTMLElement | null;
  isIntersecting: boolean | undefined;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  pagesCount: number;
  fetchNextPage: () => void;
};

export function useLoadMoreOnIntersect({
  root,
  isIntersecting,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  pagesCount,
  fetchNextPage,
}: Props) {
  const wasIntersectingRef = useRef(false);
  const skipInitialIntersectRef = useRef(true);

  useEffect(() => {
    if (!root || isLoading) {
      return;
    }

    const intersecting = isIntersecting ?? false;

    if (skipInitialIntersectRef.current && pagesCount === 1) {
      skipInitialIntersectRef.current = false;
      wasIntersectingRef.current = intersecting;
      return;
    }

    if (intersecting && !wasIntersectingRef.current && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

    wasIntersectingRef.current = intersecting;
  }, [
    root,
    isIntersecting,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    pagesCount,
    fetchNextPage,
  ]);
}
