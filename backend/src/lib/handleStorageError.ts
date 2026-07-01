import type { Response } from 'express';

import {
  AlreadySelectedError,
  DuplicateItemError,
  InvalidItemIdError,
  ItemNotFoundError,
  NotSelectedError,
} from '../storage/index.js';

export function handleStorageError(error: unknown, res: Response): boolean {
  if (error instanceof ItemNotFoundError || error instanceof NotSelectedError) {
    res.status(404).json({ error: error.message });
    return true;
  }

  if (error instanceof AlreadySelectedError || error instanceof DuplicateItemError) {
    res.status(409).json({ error: error.message });
    return true;
  }

  if (error instanceof InvalidItemIdError) {
    res.status(400).json({ error: error.message });
    return true;
  }

  return false;
}
