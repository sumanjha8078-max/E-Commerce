import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        username: { label: "Username (type 'demo')", type: "text", placeholder: "demo" },
        password: { label: "Password (type 'demo')", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === "demo" && credentials?.password === "demo") {
          return { id: "demo-user-1", name: "Demo User", email: "demo@greedycart.com" }
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
