// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  text,
  integer,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(name => `chat-with-me_${name}`);

// export const topics = createTable("topics", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   createdAt: timestamp("created_at")
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   updatedAt: timestamp("updatedAt"),
// });

export const prompts = createTable("prompts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  relevance: integer("relevance"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const promptRelations = relations(prompts, ({ many }) => ({
  responses: many(responses),
}));

export type Prompt = typeof prompts.$inferSelect & {
  responses: Response[];
};

// export type PromptInput = typeof prompts.$inferInsert;

export const responses = createTable("responses", {
  id: serial("id").primaryKey(),
  content: text("content"),
  promptId: integer("prompt_id"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const responseRelations = relations(responses, ({ one }) => ({
  prompt: one(prompts, {
    fields: [responses.promptId],
    references: [prompts.id],
  }),
}));

export type Response = typeof responses.$inferSelect;

export const defaultAvatars = createTable("default_avatars", {
  id: serial("id").primaryKey(),
  fileName: text("name").notNull(),
  fileUrl: text("url").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});
