import "server-only";

import { db } from "@/server/db";
import { prompts } from "@/server/db/schema";

export async function getSinglePrompt(promptId: number) {
  const prompt = await db.query.prompts.findFirst({
    where: (_, { eq }) => eq(prompts.id, promptId),
    orderBy: (prompts, { asc }) => [asc(prompts.relevance)],
    with: {
      responses: true,
    },
  });

  return prompt;
}

export async function getPrompts() {
  const prompts = await db.query.prompts.findMany({
    orderBy: (prompts, { asc }) => [asc(prompts.relevance)],
  });

  return prompts;
}

export async function searchPrompts(searchTerm?: string) {
  const prompts = await db.query.prompts.findMany({
    where: (prompts, { like }) =>
      searchTerm ? like(prompts.content, `%${searchTerm}%`) : undefined,
    orderBy: (prompts, { asc }) => [asc(prompts.relevance)],
    with: {
      responses: true,
    },
  });

  return prompts;
}
