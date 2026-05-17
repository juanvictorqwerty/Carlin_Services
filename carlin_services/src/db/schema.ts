import { pgTable, uuid, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: jsonb("description").notNull(),
  photos: jsonb("photos").notNull(),
  adminId: uuid("admin_id")
    .references(() => admin.id)
    .notNull(),
});

export const announcement = pgTable("announcement", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  photo: varchar("photo", { length: 255 }).notNull(),
  adminId: uuid("admin_id")
    .references(() => admin.id)
    .notNull(),
});
