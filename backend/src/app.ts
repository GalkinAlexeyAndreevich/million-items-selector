import cors from 'cors';
import express from 'express';

import { itemsRouter } from './routes/items.js';
import { selectionRouter } from './routes/selection.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRouter);
app.use('/api/selection', selectionRouter);

export default app;
