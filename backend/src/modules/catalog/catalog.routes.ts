import { Router } from 'express';

import { handleDomainError } from '../../shared/errors.js';
import { parseId, parsePagination } from '../../shared/query.js';
import { addItem, getItemsPage } from './catalog.service.js';

export const catalogRouter = Router();

catalogRouter.get('/', (req, res) => {
  const { offset, limit } = parsePagination(req.query);
  const page = getItemsPage(offset, limit);

  res.json(page);
});

catalogRouter.post('/', (req, res) => {
  const { id: rawId } = req.body ?? {};
  const id = parseId(rawId);

  if (id === null) {
    res.status(400).json({ error: 'Invalid item id' });
    return;
  }

  try {
    const body = { id: addItem(id) };
    res.status(201).json(body);
  } catch (error) {
    if (handleDomainError(error, res)) {
      return;
    }

    throw error;
  }
});
