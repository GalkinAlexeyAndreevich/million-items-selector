import { Paper, Stack, Text, Title } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';

import { useSelectedInfiniteQuery } from '@/entities/selection';
import { IdFilterInput } from '@/features/id-filter';
import { PaginatedItemsList } from '@/shared/ui/PaginatedItemsList';

export function SelectedPanel() {
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebouncedValue(filter, 300);

  const query = useSelectedInfiniteQuery(debouncedFilter);

  const items = query.data?.pages.flatMap((page) => page.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      h="100%"
      w="100%"
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <Stack gap="md" flex={1} miw={0} mih={0}>
        <Title order={3}>Выбранные</Title>
        <Text size="sm" c="dimmed">
          Список выбранных элементов
        </Text>

        <IdFilterInput value={filter} onChange={setFilter} />

        <PaginatedItemsList
          items={items}
          total={total}
          isPending={query.isPending}
          isFetchingNextPage={query.isFetchingNextPage}
          hasNextPage={query.hasNextPage ?? false}
          fetchNextPage={query.fetchNextPage}
          pagesCount={query.data?.pages.length ?? 0}
          error={query.error}
          emptyMessage={debouncedFilter ? 'Ничего не найдено' : 'Ничего не выбрано'}
        />
      </Stack>
    </Paper>
  );
}
