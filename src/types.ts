export interface PlayerInfo {
  nickname: string;
  name: string;
  lastname: string;
  description: string;
  phone: string;
  email: string;
  imagePath: string;
}

export interface PlayerRecord {
  date: string;
  name: string;
  game: number;
  ace: number;
  drop: number;
  errors: number;
  zapatero: number;
}

export interface PlayerSummary {
  name: string;
  game: number;
  ace: number;
  drop: number;
  errors: number;
  zapatero: number;
  total: number;
}

export interface MonthGroup {
  month: string;
  players: PlayerSummary[];
}