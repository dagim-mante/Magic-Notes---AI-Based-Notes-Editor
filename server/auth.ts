import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Google from "next-auth/providers/google"
import { eq } from "drizzle-orm"
import { accounts, users } from "./schema"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true
    })
  ],
  callbacks: {
    async jwt({token}){
      if(!token.sub) return token
      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub)
      })
      if(!existingUser) return token
      const existingAccount = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id)
      })
      token.name = existingUser.name
      token.email = existingUser.email
      token.image = existingUser.image
      return token
    },
    async session({session, token}){
      if (session && token.sub) {
        session.user.id = token.sub
      }
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.image = token.image as string
      }
      return session
    }
  }
})