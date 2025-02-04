// components/tournament-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import {
  tournamentBracketFormSchema,
  tournamentBracketFormSchemaType,
} from "@/schema/tournament-bracket-schema";

export function TournamentForm({
  onSubmit,
}: {
  onSubmit: (values: tournamentBracketFormSchemaType) => void;
}) {
  const form = useForm<tournamentBracketFormSchemaType>({
    resolver: zodResolver(tournamentBracketFormSchema),
    defaultValues: {
      tournamentName: "",
      gameType: "",
      startDate: "",
      teams: [{ name: "" }, { name: "" }],
    },
  });

  const {
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teams",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl mx-auto"
      >
        <FormField
          control={form.control}
          name="tournamentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Name</FormLabel>
              <FormControl>
                <Input placeholder="CS2 Championship" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gameType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Type</FormLabel>
              <FormControl>
                <Input placeholder="Counter-Strike 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full space-y-4">
          <FormLabel>Teams</FormLabel>
          <div className="w-full grid grid-cols-4 gap-2 items-center">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <FormControl>
                  <Input
                    placeholder={`Team ${index + 1} name`}
                    {...form.register(`teams.${index}.name`)}
                  />
                </FormControl>
                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {errors.teams && (
                  <p className="text-xs text-red-600">
                    {errors.teams[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "" })}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Team
          </Button>
          {form.formState.errors.teams && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.teams.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Button type="submit">Generate Bracket</Button>
        </div>
      </form>
    </Form>
  );
}
