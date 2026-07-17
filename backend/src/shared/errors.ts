import type { Response } from 'express';

export class ItemNotFoundError extends Error {
  constructor(id: number) {
    super(`Item ${id} not found`);
    this.name = 'ItemNotFoundError';
  }
}

export class AlreadySelectedError extends Error {
  constructor(id: number) {
    super(`Item ${id} is already selected`);
    this.name = 'AlreadySelectedError';
  }
}

export class DuplicateItemError extends Error {
  constructor(id: number) {
    super(`Item ${id} already exists`);
    this.name = 'DuplicateItemError';
  }
}

export class NotSelectedError extends Error {
  constructor(id: number) {
    super(`Item ${id} is not selected`);
    this.name = 'NotSelectedError';
  }
}

export function handleDomainError(error: unknown, res: Response): boolean {
  if (error instanceof ItemNotFoundError || error instanceof NotSelectedError) {
    res.status(404).json({ error: error.message });
    return true;
  }

  if (error instanceof AlreadySelectedError || error instanceof DuplicateItemError) {
    res.status(409).json({ error: error.message });
    return true;
  }

  return false;
}
