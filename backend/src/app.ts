import cors from 'cors';
import express from 'express';

import { catalogRouter } from './modules/catalog/catalog.routes.js';
import { selectionRouter } from './modules/selection/selection.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/items', catalogRouter);
app.use('/api/selection', selectionRouter);

export default app;
