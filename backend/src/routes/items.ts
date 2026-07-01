import { Router } from 'express';

import { parsePagination } from '../lib/query.js';
import {
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
  res.json(getUnselectedPage(offset, limit));
});

itemsRouter.get('/selected', (req, res) => {
  const { offset, limit } = parsePagination(req.query);
  res.json(getSelectedPage(offset, limit));
});
