import { relations, sql } from "drizzle-orm";

import {
  pgTableCreator,
  serial,
  timestamp,
  text,
  integer,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";

// Use the same database instance for multiple projects.
export const createTable = pgTableCreator(name => `chat_with_me_${name}`);

export const prompts = createTable("prompts", {
  id: serial("id").primaryKey(),
  chatbotId: integer("chat_bot_id"),
  content: text("content").notNull(),
  relevance: integer("relevance"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const promptRelations = relations(prompts, ({ many, one }) => ({
  responses: many(responses),
  chatbots: one(chatbots, {
    fields: [prompts.chatbotId],
    references: [chatbots.id],
  }),
}));

export type Prompt = typeof prompts.$inferSelect & {
  responses: Response[];
  // chatbot: Chatbot;
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

export const avatars = createTable("avatars", {
  id: serial("id").primaryKey(),
  fileName: text("name").notNull(),
  fileUrl: text("url").notNull(),
  backgroundColor: text("background_color"),
  backgroundTransparent: text("background_transparent"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export type Avatar = typeof avatars.$inferSelect;

export const chatbots = createTable("chatbots", {
  id: serial("id").primaryKey(),
  avatarId: integer("avatar_id"),
  creatorUserId: text("creator_user_id"),
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

export const chatbotRelations = relations(chatbots, ({ one, many }) => ({
  avatar: one(avatars, {
    fields: [chatbots.avatarId],
    references: [avatars.id],
  }),
  prompts: many(prompts),
  chatbotsToUsers: many(usersToChatbots),
}));

export type Chatbot = typeof chatbots.$inferSelect & {
  avatar: Avatar | null;
  // prompts: Prompt[];
};

export const usersToChatbots = createTable(
  "users_to_chatbots",
  {
    chatbotId: integer("chatbot_id").notNull(),
    clerkUserId: text("clerk_user_id").notNull(),
    // relationType: text("relation_type").notNull(),
  },
  table => ({
    pk: primaryKey({ columns: [table.chatbotId, table.clerkUserId] }),
  }),
);

export const usersToChatbotsRelations = relations(
  usersToChatbots,
  ({ one }) => ({
    chatbot: one(chatbots, {
      fields: [usersToChatbots.chatbotId],
      references: [chatbots.id],
    }),
  }),
);
