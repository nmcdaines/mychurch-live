import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const devicesTable = sqliteTable("devices", {
  id: integer().primaryKey(),
  ipAddress: text(),
  name: text(),
});
