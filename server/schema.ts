import {
    pgTable,
    text,
    primaryKey,
    integer,
    timestamp,
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
