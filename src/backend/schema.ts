import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

export type Step = {
    order: number;
    delay: number;
    device: string;
    command: string;
    properties: Record<string, unknown>;
}

export const devicesTable = sqliteTable("devices", {
  id: integer().primaryKey(),
  ipAddress: text(),
  name: text(),
  type: text({ enum: ["birddog", "atem"] })
});

export const macrosTable = sqliteTable('macros', {
  id: integer().primaryKey(),
  name: text(),
  steps: text({ mode: 'json' }).$type<Step[]>().default([]),
  deviceId: integer().references(() => devicesTable.id),
  type: text(),
})

export const macrosRelations = relations(macrosTable, ({ one }) => ({
	devices: one(devicesTable, {
    fields: [macrosTable.deviceId],
    references: [devicesTable.id]
  }),
}));

export const shortcutsTable = sqliteTable('shortcuts', {
  id: integer().primaryKey(),
  page: integer().notNull(),
  slot: integer().notNull(),
  command: text().notNull(),
  value: text()
})
