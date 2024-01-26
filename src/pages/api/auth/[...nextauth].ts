import { isDev } from "@/utils";
import { prisma } from "@/lib/prismadb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
	debug: isDev,
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			httpOptions: {
				timeout: 10000,
			},
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			if (session?.user) {
				session.user.id = user.id; //方便后面接口可以直接获取到用户ID
			}
			return session;
		},
	},
	session: {
		maxAge: 30 * 24 * 60 * 60,
	},
};

export default NextAuth(authOptions);
