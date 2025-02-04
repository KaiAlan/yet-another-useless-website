"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

interface Team {
  id: string;
  name: string;
}

interface Match {
  id: string;
  team1: Team | null;
  team2: Team | null;
  winner?: Team | null;
}

type Round = Match[];

interface Position {
  x: number;
  y: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function BracketGenerator() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState("");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [lines, setLines] = useState<Line[]>([]);

  // We'll store refs for each match card by id.
  const matchRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Add a new team.
  const addTeam = () => {
    if (teamName.trim() !== "") {
      setTeams([...teams, { id: uuidv4(), name: teamName.trim() }]);
      setTeamName("");
    }
  };

  // Compute the rounds with BYEs if necessary.
  const generateBracket = () => {
    if (teams.length < 2) return;
    const computedRounds = computeRounds(teams);
    setRounds(computedRounds);
  };

  const computeRounds = (teams: Team[]): Round[] => {
    const teamList = [...teams].sort(() => Math.random() - 0.5);
    // Fill with BYEs until teamList length is a power of 2.
    const nextPow2 = Math.pow(2, Math.ceil(Math.log2(teamList.length)));
    while (teamList.length < nextPow2) {
      teamList.push({ id: uuidv4(), name: "BYE" });
    }
    const rounds: Round[] = [];
    const firstRound: Match[] = [];
    for (let i = 0; i < teamList.length; i += 2) {
      firstRound.push({
        id: uuidv4(),
        team1: teamList[i],
        team2: teamList[i + 1],
        winner: null,
      });
    }
    rounds.push(firstRound);
    let currentRound = firstRound;
    while (currentRound.length > 1) {
      const nextRound: Match[] = [];
      for (let i = 0; i < currentRound.length; i += 2) {
        nextRound.push({
          id: uuidv4(),
          team1: null,
          team2: null,
          winner: null,
        });
      }
      rounds.push(nextRound);
      currentRound = nextRound;
    }
    return rounds;
  };

  // After rounds are generated or updated, measure each match card's center position.
  useEffect(() => {
    if (!containerRef.current) return;
    const newPositions: Record<string, Position> = {};
    Object.keys(matchRefs.current).forEach((matchId) => {
      const el = matchRefs.current[matchId];
      if (el && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        // Compute the center position relative to the container.
        newPositions[matchId] = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      }
    });
    setPositions(newPositions);
  }, [rounds]);

  // Compute connecting lines between rounds.
  useEffect(() => {
    const computedLines: Line[] = [];
    // Loop through rounds, connecting matches from one round to the next.
    // For each match in round i+1, connect from its two "parent" matches in round i.
    for (let i = 0; i < rounds.length - 1; i++) {
      const currentRound = rounds[i];
      const nextRound = rounds[i + 1];
      nextRound.forEach((nextMatch, idx) => {
        // Each next round match corresponds to two matches from the previous round.
        const parent1 = currentRound[idx * 2];
        const parent2 = currentRound[idx * 2 + 1];
        const posNext = positions[nextMatch.id];
        const posParent1 = positions[parent1?.id || ""] || null;
        const posParent2 = positions[parent2?.id || ""] || null;
        if (posNext && posParent1) {
          computedLines.push({
            x1: posParent1.x,
            y1: posParent1.y,
            x2: posNext.x,
            y2: posNext.y,
          });
        }
        if (posNext && posParent2) {
          computedLines.push({
            x1: posParent2.x,
            y1: posParent2.y,
            x2: posNext.x,
            y2: posNext.y,
          });
        }
      });
    }
    setLines(computedLines);
  }, [positions, rounds]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tournament Bracket Generator</h1>

      {/* Form to add teams */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <Button onClick={addTeam}>Add Team</Button>
      </div>

      {/* List of added teams */}
      {teams.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Teams</h2>
          <ul className="list-disc ml-6">
            {teams.map((team) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Button to generate the bracket */}
      <Button onClick={generateBracket} disabled={teams.length < 2}>
        Generate Bracket
      </Button>

      {/* Container for the bracket and SVG overlay */}
      <div
        ref={containerRef}
        className="relative mt-8 overflow-auto p-4 border border-gray-200"
      >
        {/* Bracket Display */}
        <div className="flex space-x-8">
          {rounds.map((round, roundIndex) => (
            <div key={roundIndex} className="flex flex-col items-center">
              <h3 className="font-bold mb-4">Round {roundIndex + 1}</h3>
              <div className="space-y-8">
                {round.map((match) => (
                  <Card
                    key={match.id}
                    className="w-48 relative"
                    ref={(el) => {
                      matchRefs.current[match.id] = el;
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="mb-2">
                        {match.team1 ? match.team1.name : "TBD"}
                      </div>
                      <div className="font-bold">VS</div>
                      <div className="mt-2">
                        {match.team2 ? match.team2.name : "TBD"}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SVG overlay for drawing connecting lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none\"
          xmlns="http://www.w3.org/2000/svg"
        >
          {lines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
