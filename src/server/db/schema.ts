import { desc, relations, sql } from "drizzle-orm";

import {
  pgTableCreator,
  serial,
  timestamp,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

// Use the same database instance for multiple projects.
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
  chatBotId: integer("chat_bot_id"),
  content: text("content").notNull(),
  relevance: integer("relevance"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const promptRelations = relations(prompts, ({ many, one }) => ({
  responses: many(responses),
  chatBots: one(chatBots, {
    fields: [prompts.chatBotId],
    references: [chatBots.id],
  }),
}));

export type Prompt = typeof prompts.$inferSelect & {
  responses: Response[];
  chatBot: ChatBot;
};

export const responses = createTable("responses", {
  id: serial("id").primaryKey(),
  promptId: integer("prompt_id"),
  content: text("content"),
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

export type Avatar = typeof defaultAvatars.$inferSelect;

export const chatBots = createTable("chat_bots", {
  id: serial("id").primaryKey(),
  avatarId: integer("avatar_id"),
  clerkUserId: text("user_id"),
  name: text("name").notNull(),
  description: text("description"),
  favored: boolean("favored").default(false),
  public: boolean("public").default(false),
  starred: boolean("starred").default(false),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const chatBotRelations = relations(chatBots, ({ one, many }) => ({
  avatar: one(defaultAvatars, {
    fields: [chatBots.avatarId],
    references: [defaultAvatars.id],
  }),
  prompts: many(prompts),
}));

export type ChatBot = typeof chatBots.$inferSelect & {
  avatar: Avatar;
  prompts: Prompt[];
};
