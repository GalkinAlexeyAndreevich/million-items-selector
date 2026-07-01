import { Router } from 'express';

import { handleStorageError } from '../lib/handleStorageError.js';
import { parseIdFilter, parseIdParam, parsePagination } from '../lib/query.js';
import {
  addItem,
  getItemsPage,
  getSelectedPage,
  getUnselectedPage,
} from '../storage/index.js';

export const itemsRouter = Router();

itemsRouter.get('/', (req, res) => {
  const { offset, limit } = parsePagination(req.query);
  res.json(getItemsPage(offset, limit));
});

itemsRouter.get('/unselected', (req, res) => {
  const { offset, limit } = parsePagination(req.query);
  const filter = parseIdFilter(req.query);

  res.json(getUnselectedPage(offset, limit, filter));
});

itemsRouter.get('/selected', (req, res) => {
  const { offset, limit } = parsePagination(req.query);
  const filter = parseIdFilter(req.query);

  res.json(getSelectedPage(offset, limit, filter));
});

itemsRouter.post('/', (req, res) => {
  const id = parseIdParam(String(req.body?.id ?? ''));

  if (id === null) {
    res.status(400).json({ error: 'Invalid item id' });
    return;
  }

  try {
    const createdId = addItem(id);
    res.status(201).json({ id: createdId });
  } catch (error) {
    if (handleStorageError(error, res)) {
      return;
    }

    throw error;
  }
});
