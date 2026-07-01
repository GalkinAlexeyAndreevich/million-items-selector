import { MantineProvider } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export function AppProviders({ children }: PropsWithChildren) {
  return <MantineProvider>{children}</MantineProvider>;
}
