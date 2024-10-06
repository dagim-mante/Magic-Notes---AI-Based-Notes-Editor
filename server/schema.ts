import { relations } from "drizzle-orm"
import {
    pgTable,
    text,
    primaryKey,
    integer,
    timestamp,
    serial,
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "next-auth/adapters"

   
export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password"),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image").notNull().default('https://utfs.io/f/ez2eGPgh5yPHRqyddGKJgsdkimrNyB7E92IOtTCf4PhDZb3G'),
})
   
export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount>().notNull(),
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

export const notes = pgTable(
    "note", {
        id: serial("id").primaryKey(),
        title: text("title").notNull(),
        content: text("content"),
        created: timestamp("created").defaultNow(),
        updated: timestamp("updated")
                    .defaultNow()
                    .$onUpdate(() => new Date())
    }
)

export const usersToNotes = pgTable(
    'users_to_notes',
    {
      userId: text('user_id')
        .notNull()
        .references(() => users.id),
      noteId: serial('note_id')
        .notNull()
        .references(() => notes.id),
    },
    (t) => ({
      pk: primaryKey({ columns: [t.userId, t.noteId] }),
    }),
  );


export const userRelations = relations(users, ({many}) => ({
    usersToNotes: many(usersToNotes)
}))

export const noteRelations = relations(notes, ({many}) => ({
    usersToNotes: many(usersToNotes)
}))

export const usersToNotesRelations = relations(usersToNotes, ({ one }) => ({
    note: one(notes, {
      fields: [usersToNotes.noteId],
      references: [notes.id],
    }),
    user: one(users, {
      fields: [usersToNotes.userId],
      references: [users.id],
    }),
  }));