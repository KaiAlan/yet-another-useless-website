// types/tournament.ts
export type Tournament = {
  name: string;
  gameType: string;
  startDate: string;
  teams: { name: string }[];
}

export type Round = {
  roundName: string
  matches: Match[]
}

export type Match = {
  id: string
  player1: string
  player2: string
  score1?: number
  score2?: number
  winnerId?: string
}