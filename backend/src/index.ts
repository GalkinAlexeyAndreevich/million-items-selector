import 'dotenv/config';

import app from './app.js';
import { availableItems } from './storage/index.js';

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log(`Loaded ${availableItems.length} items`);
});
