// src/routes/ticketRoutes.ts
import { Router } from 'express';
import { TicketService } from '../services/ticketService';

const ticketService = new TicketService(); // Direct instantiation of service
const router = Router();

// POST /ticket - Create a ticket
router.post('/', (req, res) => {
  const ticket = ticketService.createTicket(req.body);
  res.status(201).json(ticket);
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
  const ticket = ticketService.amendTicket(req.params.id, req.body.lines);
  res.json(ticket);
});

// PUT /status/{id} - Get the status of a ticket
router.put('/status/:id', (req, res) => {
  const status = ticketService.getTicketStatus(req.params.id);
  res.json(status);
});

export default router;
