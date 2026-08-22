import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  uid: text("uid").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default("Aluno"),
  planComplete: integer("plan_complete", { mode: "boolean" }).notNull().default(false),
  smartSheets: integer("smart_sheets", { mode: "boolean" }).notNull().default(false),
  assessmentPack: integer("assessment_pack", { mode: "boolean" }).notNull().default(false),
  themedCalendar: integer("themed_calendar", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  lastLoginAt: text("last_login_at").notNull(),
});

export const accessCodes = sqliteTable("access_codes", {
  codeHash: text("code_hash").primaryKey(),
  label: text("label").notNull(),
  scopesJson: text("scopes_json").notNull(),
  createdAt: text("created_at").notNull(),
  redeemedAt: text("redeemed_at"),
  redeemedBy: text("redeemed_by").references(() => users.uid),
});

export const blockedUsers = sqliteTable("blocked_users", {
  uid: text("uid").primaryKey(),
  email: text("email").notNull(),
  blockedAt: text("blocked_at").notNull(),
});
