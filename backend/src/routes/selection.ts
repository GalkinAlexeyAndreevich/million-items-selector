import { Router } from 'express';

import { handleStorageError } from '../lib/handleStorageError.js';
import { parseIdFilter, parseIdParam } from '../lib/query.js';
import { getSelection, reorderItem, selectItem } from '../storage/index.js';

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

selectionRouter.put('/order', (req, res) => {
  const id = parseIdParam(String(req.body?.id ?? ''));
  const overRaw = req.body?.overId;
  const overId =
    overRaw === null || overRaw === undefined || overRaw === ''
      ? null
      : parseIdParam(String(overRaw));
  const filter = typeof req.body?.filter === 'string' ? req.body.filter.trim() : '';

  if (id === null || (overRaw !== null && overRaw !== undefined && overRaw !== '' && overId === null)) {
    res.status(400).json({ error: 'Invalid id or overId' });
    return;
  }

  try {
    const ids = reorderItem(id, overId, filter);
    res.json({ ids: [...ids] });
  } catch (error) {
    if (handleStorageError(error, res)) {
      return;
    }

    throw error;
  }
});
