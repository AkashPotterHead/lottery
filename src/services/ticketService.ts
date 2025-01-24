import { Line } from '../types/types'
import { v4 as uuidv4 } from 'uuid';
import { dbService } from '../utils/database';


// src/services/ticketService.ts
export class TicketService {
   MAX_TICKET_LINES = Number(process.env.MAX_TICKET_LINES) | 300;


  async createTicket(linesCount: number) {
    // Logic to create a ticket
    try {
      const id = uuidv4();
      const lines = Array.from({ length: linesCount }, this.generateLine);/* 'lines' variable holds a data structure like this:[                                                                                  [
  { numbers: [0, 1, 2] },
  { numbers: [2, 2, 0] },
  { numbers: [1, 0, 1] }
  ]*/
      const ticket = { id, lines, statusChecked: false };
      const dbResponse = await dbService.createTicket(id, JSON.stringify(lines), false);
      //console.log(`Db response = ${JSON.stringify(dbResponse)}`)
      return { id: id, serialNumber: dbResponse.lastID };
    } catch (error: any) {
      console.log("Error in Service:", error)
      throw error;
    }
  }

  generateLine = (): Line => ({
    numbers: Array.from({ length: 3 }, () => Math.floor(Math.random() * 3)),
  });

  async getTicketById(id: string) {
    // Logic to fetch a ticket by ID
    let response :{id:number,status:string}|null=null;
    const dbResponse = await dbService.getTicketByUUID(id);
    
    if(dbResponse){ 
      const status = dbResponse.statusChecked === 0 ? "Unchecked" : "Checked"
      response = {id:dbResponse.id,status:status};
    }
    return response ;
  }

  // Amend the ticket with new lines
  async amendTicket(id: string, newLinesCount: number) {
    try {
      // Fetch the existing ticket from the database
      const existingTicket = await dbService.getTicketByUUID(id);
    
      if (!existingTicket) {
        throw new Error("Ticket not found");
      }

      if(existingTicket.statusChecked === 1){
        throw new Error("Ticket is Already Checked");
      }

      // Parse the current lines from the ticket
      const currentLines = JSON.parse(existingTicket.lines);

      // Check if adding new lines will exceed the maximum limit
      if (currentLines.length + newLinesCount > this.MAX_TICKET_LINES) {
        throw new Error(`Cannot add more than ${this.MAX_TICKET_LINES} lines to the ticket`);
      }

      const newLines = Array.from({ length: newLinesCount }, this.generateLine);

      // Add the new lines to the existing ticket lines
      const updatedLines = [...currentLines, ...newLines];

      // Update the ticket in the database
      await dbService.updateTicket(id, JSON.stringify(updatedLines));

      return { id, lines: updatedLines };
    } catch (error) {
      console.log("Error in Service:", error);
      throw error;
    }
  }

  // src/services/ticketService.ts

async getTicketStatus(id: string) {
  try {
    // Fetch the ticket by UUID
    const ticket = await dbService.getTicketByUUID(id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // If statusChecked is already true, return the current status
    if (ticket.statusChecked) {
      return { id, status: 'Checked' };
    }

    // Otherwise, update the statusChecked to true
    await dbService.updateTicketStatus(id, true);

    // Return the updated status
    return { id, status: 'Checked' };
  } catch (error) {
    console.error('Error in getTicketStatus:', error);
    throw error;
  }
}

}
