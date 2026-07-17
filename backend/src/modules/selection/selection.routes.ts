import { Router } from 'express';

import { handleDomainError } from '../../shared/errors.js';
import {
  parseFilter,
  parseId,
  parseIdFilter,
  parseOptionalId,
  parsePagination,
} from '../../shared/query.js';
import {
  getSelectedPage,
  getSelection,
  getUnselectedPage,
  reorderItem,
  selectItem,
} from './selection.service.js';

export const selectionRouter = Router();

selectionRouter.get('/', (_req, res) => {
  const body = { ids: getSelection() };

  res.json(body);
});

selectionRouter.get('/selected', (req, res) => {
  const { offset, limit } = parsePagination(req.query);
  const filter = parseIdFilter(req.query);
  const page = getSelectedPage(offset, limit, filter);

  res.json(page);
});

selectionRouter.get('/unselected', (req, res) => {
  const { offset, limit } = parsePagination(req.query);
  const filter = parseIdFilter(req.query);
  const page = getUnselectedPage(offset, limit, filter);

  res.json(page);
});

selectionRouter.post('/', (req, res) => {
  const { id: rawId } = req.body ?? {};
  const id = parseId(rawId);

  if (id === null) {
    res.status(400).json({ error: 'Invalid item id' });
    return;
  }

  try {
    const body = { ids: selectItem(id) };
    res.status(201).json(body);
  } catch (error) {
    if (handleDomainError(error, res)) {
      return;
    }

    throw error;
  }
});

selectionRouter.put('/order', (req, res) => {
  const { id: rawId, overId: rawOverId, filter: rawFilter } = req.body ?? {};

  const id = parseId(rawId);
  const overId = parseOptionalId(rawOverId);
  const filter = parseFilter(rawFilter);

  if (id === null || overId === undefined) {
    res.status(400).json({ error: 'Invalid id or overId' });
    return;
  }

  try {
    const body = { ids: reorderItem(id, overId, filter) };
    res.json(body);
  } catch (error) {
    if (handleDomainError(error, res)) {
      return;
    }

    throw error;
  }
});
