import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // No foreign key to a users table here on purpose — this service
  // doesn't own user data, it just stores the id an auth-service
  // would give it. This is the "each service owns its own data" boundary.
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  done: integer("done", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
