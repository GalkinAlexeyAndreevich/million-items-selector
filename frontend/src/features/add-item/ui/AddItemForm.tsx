import { Alert, Button, Group, NumberInput, Stack } from '@mantine/core';
import { type SubmitEventHandler, useId, useState } from 'react';

import { useAddItemQueue } from '@/entities/item';

function parseItemId(value: string | number): number | null {
  if (value === '') {
    return null;
  }

  const parsed = typeof value === 'number' ? value : Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }

  return parsed;
}

export function AddItemForm() {
  const inputId = useId();
  const [value, setValue] = useState<string | number>('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const addQueue = useAddItemQueue();

  const parsedId = parseItemId(value);
  const canSubmit = parsedId !== null && !addQueue.isPending;

  const handleChange = (nextValue: string | number) => {
    setValue(nextValue);
    setFieldError(null);
    addQueue.reset();
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (parsedId === null) {
      setFieldError('Введите целое число больше 0');
      return;
    }

    addQueue.add(parsedId, {
      onSuccess: () => {
        setValue('');
        setFieldError(null);
      },
    });
  };

  return (
    <Stack gap="sm">
      <form onSubmit={handleSubmit} noValidate>
        <Group align="flex-end" wrap="nowrap">
          <NumberInput
            id={inputId}
            label="Новый ID"
            placeholder="Введите ID"
            name="id"
            value={value}
            onChange={handleChange}
            error={fieldError}
            min={1}
            step={1}
            allowDecimal={false}
            allowNegative={false}
            inputMode="numeric"
            flex={1}
            required
          />
          <Button type="submit" loading={addQueue.isPending} disabled={!canSubmit}>
            Добавить
          </Button>
        </Group>
      </form>

      {addQueue.error && (
        <Alert color="red" title="Ошибка">
          {addQueue.error.message}
        </Alert>
      )}
    </Stack>
  );
}
