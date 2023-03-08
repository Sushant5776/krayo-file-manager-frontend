import nextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default nextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
		}),
	],
})
