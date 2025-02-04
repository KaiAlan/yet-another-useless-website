// app/tournament/page.tsx
"use client"

import { useState } from 'react'
import { TournamentForm } from '@/components/tournament-form'
import { BracketGenerator } from '@/components/bracket-generator'
import { Card } from '@/components/ui/card'
import * as z from 'zod'
import { Round } from "@/types/tournament"

interface TournamentData {
  name: string
  gameType: string
  startDate: string
  participants: number
  rounds: Round[]
}

const formSchema = z.object({
  tournamentName: z.string().min(2, "Tournament name must be at least 2 characters"),
  gameType: z.string().min(2, "Game type is required"),
  participants: z.number().min(2, "Minimum 2 participants required"),
  startDate: z.string().nonempty("Start date is required"),
})

export default function TournamentPage() {
  const [tournament, setTournament] = useState<TournamentData | null>(null)

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setTournament({
      name: values.tournamentName,
      gameType: values.gameType,
      startDate: values.startDate,
      participants: values.participants,
      rounds: [] // Will be generated by BracketGenerator
    })
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="p-8 mb-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Create New Tournament</h2>
        <TournamentForm onSubmit={handleSubmit} />
      </Card>

      {tournament && <BracketGenerator tournament={tournament} />}
    </div>
  )
}