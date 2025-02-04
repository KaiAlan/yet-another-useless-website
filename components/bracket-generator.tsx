// components/bracket-generator.tsx
"use client"

import { Card } from "@/components/ui/card"
// import { useEffect, useState } from "react"

interface Match {
  id: string
  player1: string
  player2: string
  score1?: number
  score2?: number
  winnerId?: string
}

interface Round {
  roundName: string
  matches: Match[]
}

interface Tournament {
  name: string
  gameType: string
  startDate: string
  participants?: number
  rounds: Round[]
}

export function BracketGenerator({ tournament }: { tournament: Tournament }) {

  // const [dummyParticipants, setDummyParticipants] = useState<string[]>([])
  // Dummy participant names for example
  const dummyParticipants = [
    "Team Alpha",
    "Team Bravo",
    "Team Charlie",
    "Team Delta",
    "Team Echo",
    "Team Foxtrot",
    "Team Golf",
    "Team Hotel",
  ]

  // useEffect(() => {
  //   // Generate dummy participant data based on the number of participants in the tournament
  //   if (tournament.participants) {
  //     const dummyData = Array.from({ length: tournament.participants }, (_, i) => `Player ${i + 1}`);
  //     setDummyParticipants(dummyData);
  //   }
  // },[tournament.participants])

  // Generate sample bracket data (single elimination)
  const generateBracket = (): Round[] => {
    const rounds: Round[] = []
    const participants = [...dummyParticipants]
    
    // Quarter Finals
    const quarterFinals: Match[] = []
    for (let i = 0; i < participants.length; i += 2) {
      quarterFinals.push({
        id: `qf-${i}`,
        player1: participants[i],
        player2: participants[i + 1],
        score1: Math.floor(Math.random() * 5),
        score2: Math.floor(Math.random() * 5),
        winnerId: Math.random() > 0.5 ? participants[i] : participants[i + 1]
      })
    }
    rounds.push({ roundName: "Quarter Finals", matches: quarterFinals })

    // Semi Finals
    const semiFinals: Match[] = []
    const winnersQF = quarterFinals.map(m => m.winnerId)
    for (let i = 0; i < winnersQF.length; i += 2) {
      semiFinals.push({
        id: `sf-${i}`,
        player1: winnersQF[i] || "TBD",
        player2: winnersQF[i + 1] || "TBD",
      })
    }
    rounds.push({ roundName: "Semi Finals", matches: semiFinals })

    // Final
    const final: Match[] = [{
      id: "final",
      player1: semiFinals[0].player1,
      player2: semiFinals[1].player1,
    }]
    rounds.push({ roundName: "Final", matches: final })

    return rounds
  }

  const rounds = generateBracket()

  return (
    <Card className="p-8 m-4 overflow-x-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">{tournament.name}</h1>
        <p className="text-muted-foreground">{tournament.gameType} - {new Date(tournament.startDate).toLocaleDateString()}</p>
      </div>

      <div className="flex justify-center gap-8">
        {rounds.map((round, roundIndex) => (
          <div key={round.roundName} className="flex flex-col gap-16">
            <h3 className="text-lg font-semibold text-center">{round.roundName}</h3>
            <div className="flex flex-col gap-8">
              {round.matches.map((match, matchIndex) => (
                <div key={match.id} className="relative">
                  <div className="flex flex-col gap-2 p-4 border rounded-lg w-64 bg-background">
                    <div className={`${match.player1 === match.winnerId ? 'font-bold' : ''}`}>
                      {match.player1} {match.score1 !== undefined ? `- ${match.score1}` : ''}
                    </div>
                    <div className={`${match.player2 === match.winnerId ? 'font-bold' : ''}`}>
                      {match.player2} {match.score2 !== undefined ? `- ${match.score2}` : ''}
                    </div>
                  </div>

                  {/* Connection lines */}
                  {roundIndex < rounds.length - 1 && (
                    <div className="absolute top-1/2 right-0 translate-x-8 -translate-y-1/2">
                      <div className="h-px w-8 bg-foreground" />
                      {matchIndex % 2 === 0 && (
                        <div className="absolute top-1/2 right-0 h-px w-8 bg-foreground -translate-y-1/2" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}