import { Alert, Paper, Stack, Text, Title } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';

import {
  useSelectItemMutation,
  useUnselectedInfiniteQuery,
} from '@/entities/selection';
import { AddItemForm } from '@/features/add-item';
import { IdFilterInput } from '@/features/id-filter';
import { PaginatedItemsList } from '@/shared/ui/PaginatedItemsList';

export function UnselectedPanel() {
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebouncedValue(filter, 300);

  const query = useUnselectedInfiniteQuery(debouncedFilter);
  const selectMutation = useSelectItemMutation();

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
        <Title order={3}>Доступные</Title>
        <Text size="sm" c="dimmed">
          Нажмите на элемент, чтобы выбрать
        </Text>

        <IdFilterInput value={filter} onChange={setFilter} />
        <AddItemForm />

        <PaginatedItemsList
          items={items}
          total={total}
          isPending={query.isPending}
          isFetchingNextPage={query.isFetchingNextPage}
          hasNextPage={query.hasNextPage ?? false}
          fetchNextPage={query.fetchNextPage}
          pagesCount={query.data?.pages.length ?? 0}
          error={query.error}
          emptyMessage={debouncedFilter ? 'Ничего не найдено' : 'Все элементы выбраны'}
          onItemClick={(id) => selectMutation.mutate(id)}
        />

        {selectMutation.error && (
          <Alert color="red" title="Ошибка">
            {selectMutation.error.message}
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
