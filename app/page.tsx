import { getServerSession } from 'next-auth'
import Form from './Form'
import Login from './Login'

const filenames = async () => {
	const session = await getServerSession()

	if (!session?.user?.email) return

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/file/user/${session.user.email}`,
		{ method: 'GET', next: { revalidate: 120 } }
	)
	const data = await res.json()
	return data.files
}

const HomePage = async () => {
	const files: string[] = await filenames()
	const session = await getServerSession()

	return (
		<main className='text-slate-900 space-y-6 min-h-screen h-max scroll-smooth'>
			<h1 className='text-3xl font-bold underline underline-offset-8 p-4 text-center text-indigo-500'>
				Krayo - File Manager
			</h1>

			<Login />

			{session?.user && <Form />}

			{files ? (
				<section className='w-max max-w-full mx-auto space-y-4'>
					<section className='text-center'>
						<h2 className='font-bold text-2xl'>Files</h2>
						<span
							className='text-sm text-slate-400
						'>
							Download Files by Clicking on Links Below
						</span>
					</section>

					<ul className='space-y-3'>
						{files.map((file, idx) => (
							<li key={idx}>
								<a
									download
									title={file}
									href={`${process.env.NEXT_PUBLIC_API_URL}/file/download/${session?.user?.email}/${file}`}
									className='max-w-lg font-medium w-full block py-3 px-4 hover:outline outline-2 outline-slate-300 rounded-lg bg-slate-100 truncate transition-all duration-100'>
									{file}
								</a>
							</li>
						))}
					</ul>
				</section>
			) : (
				<p className='text-lg text-center font-semibold animate-bounce'>
					Currently you have no files!
				</p>
			)}
		</main>
	)
}

export default HomePage
