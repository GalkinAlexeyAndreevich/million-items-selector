import { Container, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import { fetchItems, type ItemsResponse } from '@/entities/item';
import { ItemsList } from '@/widgets/items-list';

export function HomePage() {
  const [data, setData] = useState<ItemsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems()
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Request failed');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        <Title order={1}>Миллион элементов с выбором и сортировкой</Title>
        <ItemsList items={data?.items ?? []} loading={loading} error={error} />
      </Stack>
    </Container>
  );
}
