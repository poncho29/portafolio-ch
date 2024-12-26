import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  out: "./migrations",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!,
  },
});