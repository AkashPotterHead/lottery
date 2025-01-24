import express from 'express';
import { dbService } from './utils/database';
import 'dotenv/config'
import { createTicketRoutes } from './routes/ticketRoutes';
import { TicketService } from './services/ticketService';
import { ValidationService } from './middlewares/validation';
import { logger } from './utils/logger';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

async function startServer() {
  try {
    // Initialize the DB
    // Initialize the DB (creating tables if not exist)
    await dbService.initializeDb()

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
  } catch (error) {
    console.error('Error during server initialization:', error);
    process.exit(1); // Exit the process if DB initialization fails
  }
}

// Start the server
startServer();
