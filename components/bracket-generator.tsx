"use client";
import { Card } from "@/components/ui/card";
import { Match, Round, Tournament } from "@/types/tournament";

export function BracketGenerator({ tournament }: { tournament: Tournament }) {
  const generateBracket = (): Round[] => {
    const rounds: Round[] = [];
    const participants = tournament.teams.map((t) => t.name);
    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    let currentRound = shuffled;
    let roundNumber = 1;

    while (currentRound.length > 1) {
      const matches: Match[] = [];
      for (let i = 0; i < currentRound.length; i += 2) {
        matches.push({
          id: `round-${roundNumber}-match-${i}`,
          player1: currentRound[i],
          player2: currentRound[i + 1] || "BYE",
          score1: undefined,
          score2: undefined,
          winnerId: undefined,
        });
      }
      rounds.push({
        roundName: `Round ${roundNumber}`,
        matches,
      });
      currentRound = matches.map((m) => m.winnerId || "TBD");
      roundNumber++;
    }
    return rounds;
  };

  const rounds = generateBracket();

  return (
    <Card className="p-8 m-4 overflow-x-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">{tournament.name}</h1>
        <p className="text-muted-foreground">
          {tournament.gameType} -{" "}
          {new Date(tournament.startDate).toLocaleDateString()}
        </p>
        <p className="text-sm mt-2">
          {tournament.teams.length} teams participating
        </p>
      </div>
      <div className="flex">
        {rounds.map((round, roundIndex) => (
          <div
            key={round.roundName}
            className="flex flex-col justify-around relative"
            style={{
              // minWidth: `${100 / rounds.length}%`,
              padding: "0 2rem",
            }}
          >
            <h3 className="text-lg font-semibold text-center mb-4">
              {round.roundName}
            </h3>
            <div className="flex flex-col justify-around h-full">
              {round.matches.map((match, matchIndex) => (
                <div
                  key={match.id}
                  className="relative mb-8"
                  style={{
                    height: `calc(100% / ${round.matches.length})`,
                    marginBottom: roundIndex < rounds.length - 1 ? "2rem" : "0",
                  }}
                >
                  <div className="flex flex-col p-2 border w-40 top-1/2 bg-background z-10 relative">
                    <div
                      className={
                        match.winnerId === match.player1
                          ? "font-bold text-sm"
                          : "text-sm"
                      }
                    >
                      {match.player1}
                      {match.score1 !== undefined && ` - ${match.score1}`}
                    </div>
                    <div
                      className={
                        match.winnerId === match.player2
                          ? "font-bold text-sm"
                          : "text-sm"
                      }
                    >
                      {match.player2}
                      {match.score2 !== undefined && ` - ${match.score2}`}
                    </div>
                    {roundIndex > 0 && (
                      <div className="absolute -left-[34px] top-1/2 border-t w-[34px] z-0" />
                    )}
                    {roundIndex < rounds.length - 1 && (
                      <>
                        {/* Horizontal line from current match */}
                        <div
                          className="absolute border-t w-8 z-0"
                          style={{
                            right: "-2rem",
                            top: "50%",
                          }}
                        />

                        {/* Vertical line to connect pairs */}
                        {matchIndex % 2 === 0 && (
                          <div
                            className="absolute border-r z-0"
                            style={{
                              right: "-2rem",
                              top: "50%",
                              height: `calc(${(2**(roundIndex+1))*80}%)`,
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
