import { sql } from 'drizzle-orm';
import { datetime } from 'drizzle-orm/mysql-core';
import { blob, integer, numeric, primaryKey, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { AdapterAccountType } from "next-auth/adapters"

export const cardsTable = sqliteTable('cards', {
    id: integer('id').primaryKey().notNull(),
    name: text('name').notNull(),
    lang: text('lang').notNull(),
    released_at: numeric('released_at').notNull(),
    image_uris: text('image_uris').notNull(), // array of text
    mana_cost: blob('mana_cost').notNull(),
    type_line: text('type_line').notNull(),
    colours: text('colours').notNull(), // an array of text
    set: text('set').notNull(),
    set_name: text('set_name').notNull(),
    collector_number: integer('collector_number').notNull(),
    rarity: text('rarity').notNull(),
    prices: real('prices').notNull(), // array of real
    purchase_uris: text('purchase_uris').notNull(), // array of text
    collected: integer('collected').notNull().default(0),
})

export const users = sqliteTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
  })
   
  export const accounts = sqliteTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )
   
  export const sessions = sqliteTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  })
   
  export const verificationTokens = sqliteTable(
    "verificationToken",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull(),
      expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
    },
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    })
  )
   
  export const authenticators = sqliteTable(
    "authenticator",
    {
      credentialID: text("credentialID").notNull().unique(),
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      providerAccountId: text("providerAccountId").notNull(),
      credentialPublicKey: text("credentialPublicKey").notNull(),
      counter: integer("counter").notNull(),
      credentialDeviceType: text("credentialDeviceType").notNull(),
      credentialBackedUp: integer("credentialBackedUp", {
        mode: "boolean",
      }).notNull(),
      transports: text("transports"),
    },
    (authenticator) => ({
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    })
  )

export type InsertCard = typeof cardsTable.$inferInsert;
export type SelectCard = typeof cardsTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
