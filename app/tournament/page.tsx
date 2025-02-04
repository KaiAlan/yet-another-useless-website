// app/tournament/page.tsx
"use client"

import { useState } from 'react'
import { TournamentForm } from '@/components/tournament-form'
import { BracketGenerator } from '@/components/bracket-generator'
import { Card } from '@/components/ui/card'
import { tournamentBracketFormSchemaType } from '@/schema/tournament-bracket-schema'

export default function TournamentPage() {
  const [tournament, setTournament] = useState<{
    name: string
    gameType: string
    startDate: string
    teams: { name: string }[]
  } | null>(null)

  const handleSubmit = (values: tournamentBracketFormSchemaType) => {
    setTournament({
      name: values.tournamentName,
      gameType: values.gameType,
      startDate: values.startDate,
      teams: values.teams
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