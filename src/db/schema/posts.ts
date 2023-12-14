import { text, integer, sqliteTable} from "drizzle-orm/sqlite-core";
import {users} from "./users";
export const posts = sqliteTable('posts', {
  id: integer('id', {mode: "number"}).notNull().primaryKey({autoIncrement: true}),
  userId: integer("userId").notNull().unique().references(() =>users.id, {onDelete: "cascade"}),
  content: text("content").notNull()
});

export type typePosts = typeof posts.$inferSelect;
