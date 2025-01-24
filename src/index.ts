// src/index.ts
import 'dotenv/config';
import express from 'express';
import { createTicketRoutes } from './routes/ticketRoutes';
import { TicketService } from './services/ticketService';
import { ValidationService } from './middlewares/validation';
import { logger } from './utils/logger';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Service and Validation Instances
const ticketService = new TicketService();
const validationService = new ValidationService();

// Inject services into routes
const ticketRoutes = createTicketRoutes(ticketService, validationService);

// Routes
app.use('/ticket', ticketRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  logger.info(`Server running on http://localhost:${port}`);
});
