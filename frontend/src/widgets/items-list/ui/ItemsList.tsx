import { Alert, Badge, Loader, ScrollArea, Stack, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useState } from 'react';
import { useItemsInfiniteQuery } from '@/entities/item';
import { useLoadMoreOnIntersect } from '@/shared/lib/useLoadMoreOnIntersect';

export function ItemsList() {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);

  const {
    data,
    error,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useItemsInfiniteQuery();

  const { ref: sentinelRef, entry } = useIntersection({
    root: viewport,
    threshold: 0,
  });

  useLoadMoreOnIntersect({
    root: viewport,
    isIntersecting: entry?.isIntersecting,
    hasNextPage: hasNextPage ?? false,
    isLoading: isPending,
    isFetchingNextPage,
    pagesCount: data?.pages.length ?? 0,
    fetchNextPage
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const total = data?.pages[0]?.total ?? 0;
  const errorMessage = error instanceof Error ? error.message : null;

  if (errorMessage && items.length === 0) {
    return (
      <Alert color="red" title="Error">
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

      <ScrollArea h={710} viewportRef={setViewport} type="auto">
        {isPending ? (
          <Loader />
        ) : (
          <>
            <Stack gap="md">
              {items.map((id) => (
                <Badge key={id} variant="light" size="lg" fullWidth>
                  {id}
                </Badge>
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
        <Alert color="red" title="Error">
          {errorMessage}
        </Alert>
      )}
    </>
  );
}
