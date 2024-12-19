import { int, integer, sqliteTable, text,  } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: text("role")
    .notNull()
    .$defaultFn(() => "admin"),
  createdAt: integer("created_at")
    .$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at")
    .$defaultFn(() => Date.now()),
});

export const homeTable = sqliteTable("home", {
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