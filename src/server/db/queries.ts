import "server-only";

import { db } from "@/server/db";
import { prompts, avatars } from "@/server/db/schema";

import { chatbots, usersToChatbots } from "@/server/db/schema";
import { type SQL, eq, ne, and, inArray } from "drizzle-orm";

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

export const chatbotFilters = {
  none: undefined,
  createdByUser: (userId: string) => eq(chatbots.creatorUserId, userId),
  notCreatedByUser: (userId: string) => ne(chatbots.creatorUserId, userId),
  isPublic: eq(chatbots.public, true),
};

export const getChatbots =
  (clerkUserId: string, filter?: SQL<unknown>) => async () => {
    const userChatbotRelations = await db.query.usersToChatbots.findMany({
      where: eq(usersToChatbots.clerkUserId, clerkUserId),
    });

    const chatbotIds = userChatbotRelations.map(
      userToChatbot => userToChatbot.chatbotId,
    );

    const chatbotData = await db.query.chatbots.findMany({
      where: and(inArray(chatbots.id, chatbotIds), filter),
      with: {
        avatar: true,
      },
    });

    return chatbotData;
  };
