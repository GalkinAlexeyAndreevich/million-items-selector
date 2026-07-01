import { Alert, Button, Group, NumberInput, Stack } from '@mantine/core';
import { type SubmitEventHandler, useId, useState } from 'react';

import { useAddItemMutation } from '@/entities/item';

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
  const addMutation = useAddItemMutation();

  const parsedId = parseItemId(value);
  const canSubmit = parsedId !== null && !addMutation.isPending;

  const handleChange = (nextValue: string | number) => {
    setValue(nextValue);
    setFieldError(null);
    addMutation.reset();
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (parsedId === null) {
      setFieldError('Введите целое число больше 0');
      return;
    }

    addMutation.mutate(parsedId, {
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
          <Button type="submit" loading={addMutation.isPending} disabled={!canSubmit}>
            Добавить
          </Button>
        </Group>
      </form>

      {addMutation.isError && (
        <Alert color="red" title="Ошибка">
          {addMutation.error.message}
        </Alert>
      )}
    </Stack>
  );
}
