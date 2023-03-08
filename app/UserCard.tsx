import { DefaultSession } from 'next-auth'
import Image from 'next/image'

const UserCard = ({ user }: { user: DefaultSession['user'] }) => {
	return (
		<article className='border-2 mx-auto border-slate-200 w-max max-w-5xl p-4 rounded-lg'>
			<section className='space-y-4'>
				<p className='text-xl font-bold text-center'>Current Logged in User</p>
				<section className='space-x-4 flex justify-between items-center'>
					<div className='relative w-16 h-16'>
						<Image
							fill
							src={user?.image || ''}
							className='rounded-full'
							alt='user image'
						/>
					</div>
					<section>
						<h5 className='font-semibold text-lg'>{user?.name}</h5>
						<p className='text-sm italic text-slate-500'>{user?.email}</p>
					</section>
				</section>
			</section>
		</article>
	)
}

export default UserCard
