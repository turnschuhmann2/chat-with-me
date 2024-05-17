import { relations, sql } from "drizzle-orm";

import {
  pgTableCreator,
  serial,
  timestamp,
  text,
  integer,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";

// Use the same database instance for multiple projects.
export const createTable = pgTableCreator(name => `chat-with-me_${name}`);

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
  chatbot: Chatbot;
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
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export type Avatar = typeof avatars.$inferSelect;

export const chatbots = createTable("chatbots", {
  id: serial("id").primaryKey(),
  avatarId: integer("avatar_id"),
  creatorUserId: integer("creator_user_id"),
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
  chatbotsToUsers: many(chatbotsToUsers),
}));

export type Chatbot = typeof chatbots.$inferSelect & {
  avatar: Avatar;
  prompts: Prompt[];
};

export const chatbotsToUsers = createTable(
  "chatbots_to_users",
  {
    chatbotId: integer("chatbot_id").notNull(),
    // .references(() => users.id),
    userId: integer("user_id").notNull(),
    // .references(() => chatbots.id),
  },
  t => ({
    pk: primaryKey({
      columns: [t.userId, t.chatbotId],
      name: "pk_chatbot_to_user",
    }),
  }),
);

export const chatbotsToUsersRelations = relations(
  chatbotsToUsers,
  ({ one }) => ({
    chatbot: one(chatbots, {
      fields: [chatbotsToUsers.chatbotId],
      references: [chatbots.id],
    }),
    user: one(users, {
      fields: [chatbotsToUsers.userId],
      references: [users.id],
    }),
  }),
);

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const usersRelations = relations(users, ({ many }) => ({
  chatbotsToUsers: many(chatbotsToUsers),
}));

export type User = typeof users.$inferSelect & {
  chatbots: Chatbot[];
};
