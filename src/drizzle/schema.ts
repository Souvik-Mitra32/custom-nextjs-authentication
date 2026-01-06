import { relations } from "drizzle-orm"
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core"

export const userRoles = ["user", "admin"] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum("user_roles", userRoles)

export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").unique(),
  password: varchar("password"),
  salt: text("salt"),
  role: userRoleEnum().default("user").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const oAuthProviders = ["discord", "google"] as const
export type OAuthProvider = (typeof oAuthProviders)[number]
export const oAuthProvidersEnum = pgEnum("oauth_providers", oAuthProviders)

export const UserOAuthAccountTable = pgTable(
  "user_oauth_accounts",
  {
    userId: uuid("user_id")
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    provider: varchar("provider").notNull(),
    providerAccountId: varchar("provider_account_id").unique().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.provider, table.providerAccountId] }),
  ]
)

export const userRelations = relations(UserTable, ({ many }) => ({
  oAuthAccounts: many(UserOAuthAccountTable),
}))

export const userOAuthAccountRelations = relations(
  UserOAuthAccountTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserOAuthAccountTable.userId],
      references: [UserTable.id],
    }),
  })
)
