import path from "node:path";
import fs from "node:fs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "./schema";

// import { app } from "electron";

// const dbPath = import.meta.env.DEV
//   ? "data.db"
//   : path.join(app.getPath("appData"), "data.db");
export const dbPath = "data.db";
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const sqlite = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle(sqlite, { schema });

// export const execute = async function(e, sqlstr, params, method) {
//   // const result =
// };

export async function runMigrate() {
  migrate(db, {
    migrationsFolder: path.join(__dirname, "../../drizzle"),
  });
}
