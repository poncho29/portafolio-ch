import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("home", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  profession: text().notNull(),
  description: text().notNull(),
  address: text().notNull(),
  phone: text(),
  urlCurriculum: text().notNull(),
  linkedin: text().notNull(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
});