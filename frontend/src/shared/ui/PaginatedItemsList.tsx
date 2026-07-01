import { Alert, Button, Loader, ScrollArea, Stack, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useState } from 'react';

import { useLoadMoreOnIntersect } from '@/shared/lib/useLoadMoreOnIntersect';

type Props = {
  items: number[];
  total: number;
  isPending: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  pagesCount: number;
  error: Error | null;
  emptyMessage?: string;
  onItemClick?: (id: number) => void;
};

export function PaginatedItemsList({
  items,
  total,
  isPending,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  pagesCount,
  error,
  emptyMessage = 'Нет элементов',
  onItemClick,
}: Props) {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);

  const { ref: sentinelRef, entry } = useIntersection({
    root: viewport,
    threshold: 0,
  });

  useLoadMoreOnIntersect({
    root: viewport,
    isIntersecting: entry?.isIntersecting,
    hasNextPage,
    isLoading: isPending,
    isFetchingNextPage,
    pagesCount,
    fetchNextPage,
  });

  const errorMessage = error?.message ?? null;

  if (errorMessage && items.length === 0) {
    return (
      <Alert color="red" title="Ошибка">
        {errorMessage}
      </Alert>
    );
  }

  return (
    <>
      {total > 0 && (
        <Text size="sm" c="dimmed">
          Загружено {items.length} из {total}
        </Text>
      )}

      <ScrollArea h={560} viewportRef={setViewport} type="auto">
        {isPending ? (
          <Loader />
        ) : items.length === 0 ? (
          <Text c="dimmed" size="sm">
            {emptyMessage}
          </Text>
        ) : (
          <>
            <Stack gap="xs">
              {items.map((id) => (
                <Button
                  key={id}
                  variant="light"
                  fullWidth
                  justify="flex-start"
                  onClick={onItemClick ? () => onItemClick(id) : undefined}
                >
                  {id}
                </Button>
              ))}
            </Stack>

            {hasNextPage && (
              <div ref={sentinelRef} style={{ height: 1 }}>
                {isFetchingNextPage && <Loader size="sm" py="md" />}
              </div>
            )}
          </>
        )}
      </ScrollArea>

      {errorMessage && items.length > 0 && (
        <Alert color="red" title="Ошибка">
          {errorMessage}
        </Alert>
      )}
    </>
  );
}
