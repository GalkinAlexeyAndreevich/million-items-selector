import cors from 'cors';
import express, { type Request } from 'express';

import { getItemsPage, PAGE_SIZE } from './state/index.js';

const app = express();

app.use(cors());
app.use(express.json());

function parsePagination(query: Request['query']) {
  const offset = Math.max(0, Number(query.offset) || 0);
  const limit = Math.min(PAGE_SIZE, Math.max(1, Number(query.limit) || PAGE_SIZE));

  return { offset, limit };
}

app.get('/api/items', (req, res) => {
  const { offset, limit } = parsePagination(req.query);
  res.json(getItemsPage(offset, limit));
});

export default app;
