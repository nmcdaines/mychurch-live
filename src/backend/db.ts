// https://stackoverflow.com/questions/78614985/could-not-dynamically-require

import path from "node:path";
import fs from "node:fs";
import { type IpcMainInvokeEvent } from "electron";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { type AsyncRemoteCallback } from "drizzle-orm/sqlite-proxy";
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

export const execute = async function (
  _event: IpcMainInvokeEvent,
  ...args: Parameters<AsyncRemoteCallback>
): ReturnType<AsyncRemoteCallback> {
  const [sqlstr, params, method] = args;
  const { rows: objectRows, columns } = await sqlite.execute(sqlstr, params);
  return {
    rows: objectRows.map((obj) => columns.map((col) => obj[col])),
  };
};

export async function runMigrate() {
  migrate(db, {
    migrationsFolder: path.join(__dirname, "../../drizzle"),
  });
}
