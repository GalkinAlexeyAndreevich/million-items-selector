import { Box, Container, Flex, Stack, Title } from '@mantine/core';

import { SelectedPanel } from '@/widgets/selected-panel';
import { UnselectedPanel } from '@/widgets/unselected-panel';

export function HomePage() {
  return (
    <Box h="100dvh" display="flex" style={{ flexDirection: 'column', overflow: 'hidden' }}>
      <Container
        fluid
        py="md"
        px="md"
        flex={1}
        w="80%"
        miw={0}
        mih={0}
        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <Stack gap="md" flex={1} miw={0} mih={0}>
          <Title order={1}>Миллион элементов с выбором и сортировкой</Title>

          <Flex
            gap="md"
            align="stretch"
            flex={1}
            miw={0}
            mih={0}
            w="100%"
            direction={{ base: 'column', md: 'row' }}
          >
            <Box flex={1} miw={0} mih={0} w="100%">
              <UnselectedPanel />
            </Box>
            <Box flex={1} miw={0} mih={0} w="100%">
              <SelectedPanel />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
