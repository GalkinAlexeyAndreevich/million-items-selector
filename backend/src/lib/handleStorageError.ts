import type { Response } from 'express';

import {
  AlreadySelectedError,
  ItemNotFoundError,
} from '../storage/index.js';

export function handleStorageError(error: unknown, res: Response): boolean {
  if (error instanceof ItemNotFoundError) {
    res.status(404).json({ error: error.message });
    return true;
  }

  if (error instanceof AlreadySelectedError) {
    res.status(409).json({ error: error.message });
    return true;
  }

  return false;
}
