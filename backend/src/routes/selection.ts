import { Router } from 'express';

import { handleStorageError } from '../lib/handleStorageError.js';
import { parseIdParam } from '../lib/query.js';
import { getSelection, selectItem } from '../storage/index.js';

export const selectionRouter = Router();

selectionRouter.get('/', (_req, res) => {
  res.json({ ids: [...getSelection()] });
});

selectionRouter.post('/', (req, res) => {
  const id = parseIdParam(String(req.body?.id ?? ''));

  if (id === null) {
    res.status(400).json({ error: 'Invalid item id' });
    return;
  }

  try {
    const ids = selectItem(id);
    res.status(201).json({ ids: [...ids] });
  } catch (error) {
    if (handleStorageError(error, res)) {
      return;
    }

    throw error;
  }
});
