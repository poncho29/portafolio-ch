import { defineConfig } from "drizzle-kit";

console.log('URL', process.env.TURSO_DATABASE_URL);
console.log('TOKEN', process.env.TURSO_AUTH_TOKEN);

export default defineConfig({
  dialect: "turso",
  out: "./migrations",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});