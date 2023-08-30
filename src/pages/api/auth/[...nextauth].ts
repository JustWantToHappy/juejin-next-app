import { isDev } from '@/utils'
import {prisma} from '@/lib/prismadb'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  //debug:isDev,
  adapter: PrismaAdapter(prisma),
  secret:process.env.SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID??'',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      httpOptions: {
        timeout:50000
      }
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id=user.id
      }
      return session      
    }
  },
  //session: {
  //  strategy: 'database',
  //  maxAge: 30 * 24 * 60 * 60,
  //  updateAge: 24 * 60 * 60,
  //  generateSessionToken() {
  //    return randomUUID?.()??randomBytes(32).toString('hex')
  //  }
  //}
}

export default NextAuth(authOptions)
