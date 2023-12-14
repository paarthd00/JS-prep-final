import { text, integer, sqliteTable} from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: integer('id', {mode: "number"}).notNull().primaryKey({autoIncrement: true}),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});


// export default users;

export type typeUsers = typeof users.$inferSelect;
