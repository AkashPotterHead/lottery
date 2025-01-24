// src/routes/ticketRoutes.ts
import { Router } from 'express';
import { TicketService } from '../services/ticketService';
import { ValidationService } from '../middlewares/validation';

export const createTicketRoutes = (ticketService: TicketService, validationService: ValidationService) => {
  const router = Router();

  // POST /ticket - Create a ticket
  router.post('/', (req, res) => {
    try {
      validationService.validatePostRequest(req);
      const ticket = ticketService.createTicket(req.body.linesCount);
      res.status(201).json(ticket);
    } catch (error: any) {
      if (error.isValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });

  // GET /ticket/{id} - Get a specific ticket by ID
  router.get('/:id', (req, res) => {
    const ticket = ticketService.getTicketById(req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  });

  // PUT /ticket/{id} - Amend a ticket
  router.put('/:id', (req, res) => {
    try {
      const ticket = ticketService.amendTicket(req.params.id, req.body.lines);
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // PUT /status/{id} - Get the status of a ticket
  router.put('/status/:id', (req, res) => {
    try {
      const status = ticketService.getTicketStatus(req.params.id);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
};
