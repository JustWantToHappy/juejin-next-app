import {prisma} from '@/lib/prismadb'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
       email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials, req) {
         const user= await prisma.user.findFirst({where:{
           email: credentials?.email,
          }})
        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', //加密后的jwt会存储在cookie中
    maxAge:7*24*60*60 //a week
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session?.user && token) {
        const user = session.user as {id:string}
        user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn:'/login'
  }
}

export default NextAuth(authOptions)

