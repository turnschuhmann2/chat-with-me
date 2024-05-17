import "server-only";

import { db } from "@/server/db";
import { prompts, avatars } from "@/server/db/schema";

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

export async function getAvatars() {
  const avatars = await db.query.avatars.findMany();

  return avatars;
}

export async function getSingleAvatar(avatarId: number) {
  const avatar = await db.query.avatars.findFirst({
    where: (_, { eq }) => eq(avatars.id, avatarId),
  });

  // if (!avatar) {
  //   throw new Error(`No avatar found with id ${avatarId}`);
  // }

  return avatar;
}
