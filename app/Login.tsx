'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import UserCard from './UserCard'

const Login = () => {
	const { data: session, status } = useSession()

	if (session) {
		return (
			<div className='space-y-4'>
				<button
					className='block mx-auto py-2 px-4 rounded-lg font-medium text-white bg-indigo-500'
					onClick={() => signOut()}>
					Sign Out of Google
				</button>
				<UserCard user={session?.user} />
			</div>
		)
	} else if (status === 'loading') {
		return (
			<p className='text-center font-semibold text-xl text-slate-600'>
				Loading...
			</p>
		)
	} else {
		return (
			<div>
				<button
					className='block mx-auto py-2 px-4 rounded-lg font-medium text-white bg-indigo-500'
					onClick={() => signIn('google')}>
					Sign In with Google
				</button>
			</div>
		)
	}
}

export default Login
