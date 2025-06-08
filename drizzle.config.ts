import { dbPath } from "./src/backend/db";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/backend/schema.ts",
  out: "./drizzle",

  dbCredentials: { url: `file:${dbPath}` },
});
