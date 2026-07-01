import { Paper, Stack, Text, Title } from '@mantine/core';

import { useSelectedInfiniteQuery } from '@/entities/selection';
import { PaginatedItemsList } from '@/shared/ui/PaginatedItemsList';

export function SelectedPanel() {
  const query = useSelectedInfiniteQuery();

  const items = query.data?.pages.flatMap((page) => page.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return (
    <Paper withBorder p="md" radius="md" h="100%">
      <Stack gap="md">
        <Title order={3}>Выбранные</Title>
        <Text size="sm" c="dimmed">
          Список выбранных элементов
        </Text>

        <PaginatedItemsList
          items={items}
          total={total}
          isPending={query.isPending}
          isFetchingNextPage={query.isFetchingNextPage}
          hasNextPage={query.hasNextPage ?? false}
          fetchNextPage={query.fetchNextPage}
          pagesCount={query.data?.pages.length ?? 0}
          error={query.error}
          emptyMessage="Ничего не выбрано"
        />
      </Stack>
    </Paper>
  );
}
