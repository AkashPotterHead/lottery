export interface Line {
    numbers: number[];
    result?: number;
  }
  
  export interface Ticket {
    id: string;
    lines: Line[];
    statusChecked: boolean;
  }