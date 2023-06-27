import axios, { setCsrfToken } from "@/lib/axios";
import slugify from "@/lib/slugify";
import NextAuth, { NextAuthOptions, DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

declare module 'next-auth' {
	interface Session {
		user?: DefaultUser & { id: number; username: string, email: string };
	}
	interface User extends DefaultUser {
		user: { id: number; username: string, email: string };
		error: string;
		accessToken: string
	}
}

// export const authOptions: NextAuthOptions = 
const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 20 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		maxAge: 7 * 24 * 60 * 60,
	},
	pages: {
		signIn: "/auth/login",
		error: "/auth/login",
		newUser: "/auth/register",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			type: "credentials",
			id: "login",
			credentials: {},
			authorize: async (credentials) => {
				const { email, password } = credentials as { email: string, password: string };
				if (!email || !password) return null
				try {
					setCsrfToken()
					const response = await axios.post("/api/auth/local", {
						identifier: email,
						password: password
					})
					const { user, jwt } = response?.data
					if (user) {
						return {
							error: null,
							user: { email: user.email, username: user.username, id: user.id },
							accessToken: jwt,
						} as any;
					}
				} catch (error: any) {
					console.error("Signin Error : ", error?.response.data.error);
					if (error?.response?.data.error.message.includes('Invalid identifier')) {
						throw new Error(
							"Invalid user credentials."
						);
					}
					throw new Error("Something wrong happened.");
				}

				return null;
			},
		}),
		CredentialsProvider({
			type: "credentials",
			id: "register",
			credentials: {},
			authorize: async (credentials) => {
				const { email, password, username, newsletter } = credentials as { username: string, email: string, password: string, newsletter: boolean };
				if (!email || !password || !username) return null
				try {
					setCsrfToken()
					const response = await axios.post("/api/auth/local/register", {
						username: slugify(username),
						email: email,
						password: password,
						newsletter: newsletter,
					})
					const { user, jwt } = response?.data
					if (user) {
						return {
							error: null,
							user: { email: user.email, username: user.username, id: user.id },
							accessToken: jwt,
							// expiresIn: user.expires,
						} as any;
					}
				} catch (error: any) {
					console.error("Registration Error : ", error?.response.data.error);

					if (error?.response?.data.error.message.includes("Email or Username are already taken")) {
						throw new Error("Email or Username are already taken.");
					}
					throw new Error("Something wrong happened.");
				}
			},
		})
	],
	callbacks: {
		async signIn({ user, account, profile, email }) {
			if (user?.error || !user) return false

			return true;
		},
		async jwt({ token, user, account }) {
			if (account?.provider === "login" || account?.provider === "register") {
				token.accessToken = user.accessToken;
				token.user = user.user;
			}
			return token;
		},
		async session({ session, user, token }: { session: any, user: any, token: any }) {
			if (token) {
				session.accessToken = token.accessToken;
				session.user = token.user;
			}
			return session;
		},
	},
})

export { handler as GET, handler as POST }