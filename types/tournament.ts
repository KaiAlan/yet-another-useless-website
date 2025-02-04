// types/tournament.ts
export interface Tournament {
  id: string
  name: string
  gameType: string
  participants: number
  startDate: string
  status: 'upcoming' | 'ongoing' | 'completed'
  rounds: Round[]
}

export interface Round {
  roundName: string
  matches: Match[]
}

export interface Match {
  id: string
  player1: string
  player2: string
  score1?: number
  score2?: number
  winnerId?: string
}