// src/routes/ticketRoutes.ts
import { Router } from 'express';
import { TicketService } from '../services/ticketService';
import { ValidationService } from '../middlewares/validation';

export const createTicketRoutes = (ticketService: TicketService, validationService: ValidationService) => {
  const router = Router();

  // POST /ticket - Create a ticket
  router.post('/', async (req, res) => {
    try {
      validationService.validatePostRequest(req);
      const ticket = await ticketService.createTicket(Number(req.query.lines));
      res.status(201).json(ticket);
    } catch (error: any) {
      if (error.isValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

  // GET /ticket/{id} - Get a specific ticket by ID
  router.get('/:id', async(req, res) => {
    const ticket = await ticketService.getTicketById(req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  });

  // PUT /ticket/{id} - Amend a ticket
  router.put('/:id', async(req, res) => {
    try {
      validationService.validatePostRequest(req);
      const ticket = await ticketService.amendTicket(req.params.id, Number(req.query.lines));
      res.json(ticket);
    } catch (error:any) {
      console.log(`Error: ${error}`)
      res.status(500).json({ message: error.message });
    }
  });

  // PUT /status/{id} - Get the status of a ticket
  router.put('/status/:id', async(req, res) => {
    try {
      const status = await ticketService.getTicketStatus(req.params.id);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
};
