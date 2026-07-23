/**
 * Очередь запросов с дедупликацией.
 *
 * - Запросы выполняются строго по одному, в порядке добавления (FIFO).
 * - Каждый запрос идентифицируется ключом. Пока запрос с таким ключом
 *   находится в очереди или выполняется, повторное добавление того же ключа
 *   игнорируется. Это гарантирует, что одно и то же значение не попадёт
 *   в обработку дважды.
 */
export type RequestQueue<Key> = {
  /**
   * Добавляет запрос в очередь.
   * Возвращает true, если запрос принят, и false, если такой ключ уже в работе.
   */
  enqueue: (key: Key, task: () => Promise<unknown>) => boolean;
  /** Находится ли ключ сейчас в очереди или в обработке. */
  has: (key: Key) => boolean;
};

type QueueItem<Key> = {
  key: Key;
  task: () => Promise<unknown>;
};

export function createRequestQueue<Key>(): RequestQueue<Key> {
  const pendingKeys = new Set<Key>();
  const queue: QueueItem<Key>[] = [];
  let isProcessing = false;

  async function processNext(): Promise<void> {
    if (isProcessing) {
      return;
    }

    const next = queue.shift();
    if (!next) {
      return;
    }

    isProcessing = true;
    try {
      await next.task();
    } catch {
      // Ошибку обрабатывает вызывающая сторона (task ловит её сама).
    } finally {
      pendingKeys.delete(next.key);
      isProcessing = false;
      processNext();
    }
  }

  return {
    enqueue(key, task) {
      if (pendingKeys.has(key)) {
        return false;
      }

      pendingKeys.add(key);
      queue.push({ key, task });
      processNext();
      return true;
    },
    has(key) {
      return pendingKeys.has(key);
    },
  };
}
