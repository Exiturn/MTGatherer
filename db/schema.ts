import { sql } from 'drizzle-orm';
import { datetime } from 'drizzle-orm/mysql-core';
import { blob, integer, numeric, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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

export type InsertCard = typeof cardsTable.$inferInsert;
export type SelectCard = typeof cardsTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
