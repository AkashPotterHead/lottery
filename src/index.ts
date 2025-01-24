// src/index.ts
import 'dotenv/config';//Needs to be on top, before any routes/service file imports.
import express from 'express';
import ticketRoutes from './routes/ticketRoutes';
import { logger } from './utils/logger';

const app = express();
const port = 3000;

//console.log("Dotenv config = ", process.env.MAX_TICKET_LINES)

// Middleware
app.use(express.json());

// Routes
app.use('/ticket', ticketRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  logger.info(`Server running on http://localhost:${port}`);
});
