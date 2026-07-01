import { Container, Stack, Title } from '@mantine/core';

import { ItemsList } from '@/widgets/items-list';

export function HomePage() {
  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        <Title order={1}>Миллион элементов с выбором и сортировкой</Title>
        <ItemsList />
      </Stack>
    </Container>
  );
}
