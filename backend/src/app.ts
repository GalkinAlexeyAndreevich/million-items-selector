import cors from 'cors';
import express from 'express';

const app = express();
const TOTAL_ITEMS = 1_000_000;
const PAGE_SIZE = 20;

app.use(cors());
app.use(express.json());

// TODO: заменить на реальное состояние
app.get('/api/items', (req, res) => {
  const offset = Math.max(0, Number(req.query.offset) || 0);
  const limit = Math.min(PAGE_SIZE, Math.max(1, Number(req.query.limit) || PAGE_SIZE));

  const items: number[] = [];
  for (let i = 0; i < limit; i++) {
    const id = offset + i + 1;
    if (id > TOTAL_ITEMS) break;
    items.push(id);
  }

  res.json({ items, total: TOTAL_ITEMS, offset, limit });
});

export default app;
