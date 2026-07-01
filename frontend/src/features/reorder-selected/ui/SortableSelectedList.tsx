import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Alert, Box, Button, Loader, ScrollArea, Stack, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useState } from 'react';

import { useReorderItemMutation } from '@/entities/selection';
import { useLoadMoreOnIntersect } from '@/shared/lib/useLoadMoreOnIntersect';

type SortableRowProps = {
  id: number;
};

function SortableRow({ id }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(id) });

  return (
    <Button
      ref={setNodeRef}
      variant="light"
      fullWidth
      justify="flex-start"
      opacity={isDragging ? 0.5 : 1}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      {...attributes}
      {...listeners}
    >
      {id}
    </Button>
  );
}

type Props = {
  items: number[];
  total: number;
  filter: string;
  isPending: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  pagesCount: number;
  error: Error | null;
  emptyMessage?: string;
};

export function SortableSelectedList({
  items,
  total,
  filter,
  isPending,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  pagesCount,
  error,
  emptyMessage = 'Нет элементов',
}: Props) {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const reorderMutation = useReorderItemMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const { ref: sentinelRef, entry } = useIntersection({
    root: viewport,
    threshold: 0,
  });

  useLoadMoreOnIntersect({
    root: viewport,
    isIntersecting: entry?.isIntersecting,
    hasNextPage,
    isLoading: isPending,
    isFetchingNextPage,
    pagesCount,
    fetchNextPage,
  });

  const errorMessage = error?.message ?? null;
  const sortableIds = items.map((id) => String(id));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    reorderMutation.mutate({
      id: Number(active.id),
      overId: Number(over.id),
      filter,
    });
  };

  if (errorMessage && items.length === 0) {
    return (
      <Alert color="red" title="Ошибка">
        {errorMessage}
      </Alert>
    );
  }

  return (
    <Stack gap="xs" flex={1} miw={0} mih={0}>
      {total > 0 && (
        <Text size="sm" c="dimmed">
          Загружено {items.length} из {total}
        </Text>
      )}

      <Box flex={1} miw={0} mih={0}>
        <ScrollArea h="100%" viewportRef={setViewport} type="auto">
          {isPending ? (
            <Loader />
          ) : items.length === 0 ? (
            <Text c="dimmed" size="sm">
              {emptyMessage}
            </Text>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
                <Stack gap="xs">
                  {items.map((id) => (
                    <SortableRow key={id} id={id} />
                  ))}
                </Stack>
              </SortableContext>

              {hasNextPage && (
                <div ref={sentinelRef} style={{ height: 1 }}>
                  {isFetchingNextPage && <Loader size="sm" py="md" />}
                </div>
              )}
            </DndContext>
          )}
        </ScrollArea>
      </Box>

      {reorderMutation.error && (
        <Alert color="red" title="Ошибка сортировки">
          {reorderMutation.error.message}
        </Alert>
      )}

      {errorMessage && items.length > 0 && (
        <Alert color="red" title="Ошибка">
          {errorMessage}
        </Alert>
      )}
    </Stack>
  );
}
