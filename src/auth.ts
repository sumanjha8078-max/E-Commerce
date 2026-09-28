import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        username: { label: "Username (type 'demo')", type: "text", placeholder: "demo" },
        password: { label: "Password (type 'demo')", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === "demo" && credentials?.password === "demo") {
          let user = await prisma.user.findUnique({ where: { email: "demo@greedycart.com" } })
          if (!user) {
            user = await prisma.user.create({
              data: { name: "Demo User", email: "demo@greedycart.com" }
            })
          }
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: "jwt" }
})
