import { Alert, Paper, Stack, Text, Title } from '@mantine/core';

import {
  useSelectItemMutation,
  useUnselectedInfiniteQuery,
} from '@/entities/selection';
import { PaginatedItemsList } from '@/shared/ui/PaginatedItemsList';

export function UnselectedPanel() {
  const query = useUnselectedInfiniteQuery();
  const selectMutation = useSelectItemMutation();

  const items = query.data?.pages.flatMap((page) => page.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return (
    <Paper withBorder p="md" radius="md" h="100%">
      <Stack gap="md">
        <Title order={3}>Доступные</Title>
        <Text size="sm" c="dimmed">
          Нажмите на элемент, чтобы выбрать
        </Text>

        <PaginatedItemsList
          items={items}
          total={total}
          isPending={query.isPending}
          isFetchingNextPage={query.isFetchingNextPage}
          hasNextPage={query.hasNextPage ?? false}
          fetchNextPage={() => void query.fetchNextPage()}
          pagesCount={query.data?.pages.length ?? 0}
          error={query.error}
          emptyMessage="Все элементы выбраны"
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
