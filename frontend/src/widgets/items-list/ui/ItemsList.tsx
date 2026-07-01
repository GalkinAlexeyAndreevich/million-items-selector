import { Alert, Badge, Loader, SimpleGrid } from '@mantine/core';

import type { ItemId } from '@/entities/item';

type ItemsListProps = {
  items: ItemId[];
  loading: boolean;
  error: string | null;
};

export function ItemsList({ items, loading, error }: ItemsListProps) {
  if (error) {
    return (
      <Alert color="red" title="Error">
        {error}
      </Alert>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <SimpleGrid cols={4}>
      {items.map((id) => (
        <Badge key={id} variant="light" size="lg" fullWidth>
          {id}
        </Badge>
      ))}
    </SimpleGrid>
  );
}
