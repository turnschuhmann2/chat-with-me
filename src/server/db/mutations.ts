import "server-only";

import { DrizzleError, TransactionRollbackError, eq } from "drizzle-orm";

import { db } from "@/server/db";
import { prompts, responses } from "@/server/db/schema";

export async function updatePromptContent(promptId: number, content = "") {
  await db.update(prompts).set({ content }).where(eq(prompts.id, promptId));
}

export async function updateResponseContent(responseId: number, content = "") {
  await db
    .update(responses)
    .set({ content })
    .where(eq(responses.id, responseId));
}

export async function createResponse(promptId: number, content = "") {
  const newResponseId = await db
    .insert(responses)
    .values({ promptId, content })
    .returning({ id: responses.id });

  return newResponseId;
}

export async function deleteResponse(responseId: number) {
  await db.delete(responses).where(eq(responses.id, responseId));
}

export async function createPrompt(content = "") {
  const newPromptId = await db
    .insert(prompts)
    .values({ content })
    .returning({ id: prompts.id });

  return newPromptId;
}

export async function deletePrompt(promptId: number) {
  try {
    await db.transaction(async tx => {
      await tx.delete(responses).where(eq(responses.promptId, promptId));
      await tx.delete(prompts).where(eq(prompts.id, promptId));
    });
  } catch (e) {
    if (e instanceof DrizzleError) {
      // Handle Drizzle-specific errors
    } else if (e instanceof TransactionRollbackError) {
      // Handle transaction rollback errors
    } else {
      // Handle other errors
    }
  }
}
