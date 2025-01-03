import { int, integer, sqliteTable, text,  } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  name: text().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  role: text().notNull().$defaultFn(() => "admin"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").$defaultFn(() => Date.now()),
});

export const homeTable = sqliteTable("home", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
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

export const projects = sqliteTable("projects", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  title: text().notNull(),
  description: text(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  status: text().notNull().$defaultFn(() => "pending"),
  imageUrl: text().notNull(),
  url: text(),
  stack: text().notNull(),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});