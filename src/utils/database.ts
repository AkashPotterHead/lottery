// src/services/dbService.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

class DbService {
  private db: Promise<Database>;

  constructor() {
    this.db = open({
      filename: './lottery.db',
      driver: sqlite3.Database
    });
  }

  // Initialize the DB and ensure the tickets table is created
  async initializeDb() {
    const database = await this.db;
    await database.run(`
      CREATE TABLE IF NOT EXISTS tickets (
        id TEXT,
        serialNumber INTEGER PRIMARY KEY AUTOINCREMENT,
        lines TEXT,
        statusChecked BOOLEAN
      );
    `);
  }

  // Helper function to get a single row by UUID
  async getTicketByUUID(uuid: string) {
    const db = await this.db;
    return db.get('SELECT * FROM tickets WHERE id = ?', [uuid]);
  }

  // Helper function to create a new ticket
  async createTicket(uuid: string, lines: string, statusChecked: boolean) {
    const db = await this.db;
    const result = await db.run(`
      INSERT INTO tickets (id, lines, statusChecked) 
      VALUES (?, ?, ?)`, [uuid, lines, statusChecked]);

    return { id: uuid, lastID: result.lastID };
  }

  // Update ticket lines
  async updateTicket(uuid: string, newLines: string) {
    const db = await this.db;
    await db.run(`
      UPDATE tickets 
      SET lines = ? 
      WHERE id = ?`, [newLines, uuid]);
  }

  async updateTicketStatus(uuid: string, statusChecked: boolean) {
    const db = await this.db;
    await db.run(`
      UPDATE tickets 
      SET statusChecked = ? 
      WHERE id = ?`, [statusChecked, uuid]);
  }

  // Add any other DB-related methods here (e.g., update ticket status, etc.)
}
const dbService = new DbService();

export  {dbService}
