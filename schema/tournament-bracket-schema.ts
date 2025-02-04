import { z } from "zod";


// Helper function to check power of two
export const isPowerOfTwo = (n: number) => n > 0 && (n & (n - 1)) === 0;

export const tournamentBracketFormSchema = z.object({
  tournamentName: z
    .string()
    .min(2, "Tournament name must be at least 2 characters"),
  gameType: z.string().min(2, "Game type is required"),
  startDate: z.string().nonempty("Start date is required"),
  teams: z
    .array(
      z.object({
        name: z.string().min(2, "Team name must be at least 2 characters"),
      })
    )
    .min(2, "At least 2 teams required")
    .refine(
      (teams) => isPowerOfTwo(teams.length),
      "Number of teams must be a power of two (2, 4, 8, 16, etc.)"
    ),
});

export type tournamentBracketFormSchemaType = z.infer<typeof tournamentBracketFormSchema>