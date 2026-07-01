import { Box, Container, Flex, Stack, Title } from '@mantine/core';

import { SelectedPanel } from '@/widgets/selected-panel';
import { UnselectedPanel } from '@/widgets/unselected-panel';

export function HomePage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="md">
        <Title order={1}>Миллион элементов с выбором и сортировкой</Title>

        <Flex
          gap="md"
          align="stretch"
        >
          <Box flex={1}>
            <UnselectedPanel />
          </Box>
          <Box flex={1}>
            <SelectedPanel />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
