import { TextInput } from '@mantine/core';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function IdFilterInput({ value, onChange }: Props) {
  return (
    <TextInput
      label="Фильтр по ID"
      placeholder="Введите ID элемента"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      inputMode="numeric"
    />
  );
}
