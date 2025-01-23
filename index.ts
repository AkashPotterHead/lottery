// src/index.ts
import express from 'express';
import ticketRoutes from './routes/ticketRoutes';
import { logger } from './utils/logger';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/ticket', ticketRoutes);

// Start Server
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
