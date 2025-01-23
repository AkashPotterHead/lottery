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










// import express, { Request, Response } from 'express'
// import { v4 as uuidv4 } from 'uuid';

// const app = express();
// const port = 3000;

// app.use(express.json());

// // Types
// interface Line {
//   numbers: number[];
//   result?: number;
// }

// interface Ticket {
//   id: string;
//   lines: Line[];
//   statusChecked: boolean;
// }

// // In-memory database
// const tickets: Record<string, Ticket> = {};

// // Helper Functions
// const generateLine = (): Line => ({
//   numbers: Array.from({ length: 3 }, () => Math.floor(Math.random() * 3)),
// });

// const calculateResult = (line: Line): number => {
//   const [a, b, c] = line.numbers;
//   if (a + b + c === 2) return 10;
//   if (a === b && b === c) return 5;
//   if (b !== a && c !== a) return 1;
//   return 0;
// };

// const calculateAndSortLines = (lines: Line[]): Line[] => {
//   return lines
//     .map((line) => ({ ...line, result: calculateResult(line) }))
//     .sort((a, b) => (b.result || 0) - (a.result || 0));
// };

// // Endpoints

// // Create a new ticket
// app.post('/ticket', (req:Request,res:Response) => {
//   const body = req.body;
//   const { n } = body;
//   if (typeof n !== 'number' || n <= 0) {
//     return res.status(400).json({ error: 'Invalid number of lines.' });
//   }

//   const id = uuidv4();
//   const lines = Array.from({ length: n }, generateLine);
//   tickets[id] = { id, lines, statusChecked: false };

//   res.status(201).json({ ticket: tickets[id] });
// });

// // Get all tickets
// app.get('/ticket', (req: Request, res: Response) => {
//   res.json({ tickets: Object.values(tickets) });
// });

// // Get a specific ticket
// app.get('/ticket/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const ticket = tickets[id];

//   if (!ticket) {
//     return res.status(404).json({ error: 'Ticket not found.' });
//   }

//   res.json({ ticket });
// });

// // Amend a ticket
// app.put('/ticket/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { n } = req.body;

//   if (typeof n !== 'number' || n <= 0) {
//     return res.status(400).json({ error: 'Invalid number of lines.' });
//   }

//   const ticket = tickets[id];

//   if (!ticket) {
//     return res.status(404).json({ error: 'Ticket not found.' });
//   }

//   if (ticket.statusChecked) {
//     return res.status(400).json({ error: 'Cannot amend a ticket after status is checked.' });
//   }

//   const newLines = Array.from({ length: n }, generateLine);
//   ticket.lines.push(...newLines);

//   res.json({ ticket });
// });

// // Check ticket status
// app.put('/status/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const ticket = tickets[id];

//   if (!ticket) {
//     return res.status(404).json({ error: 'Ticket not found.' });
//   }

//   if (ticket.statusChecked) {
//     return res.status(400).json({ error: 'Ticket status already checked.' });
//   }

//   ticket.lines = calculateAndSortLines(ticket.lines);
//   ticket.statusChecked = true;

//   res.json({ ticket });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Lottery system API running at http://localhost:${port}`);
// });
