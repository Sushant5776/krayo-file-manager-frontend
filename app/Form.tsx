'use client'

import { useSession } from 'next-auth/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const Form = () => {
	const [file, setFile] = useState<File | undefined>(undefined)
	const [uploading, setUploading] = useState(false)
	const [progress, setProgress] = useState(0)
	const { data: session } = useSession()

	const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		const file = event.target.files?.[0]
		setFile(file)
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData()

		if (!file || !session?.user?.email) return

		formData.append('file', file)
		formData.append('user', session.user.email)

		setUploading(true)
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL!}/file`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
				onUploadProgress: (progressEvent) => {
					if (progressEvent.total)
						setProgress(
							Math.round((progressEvent.loaded * 100) / progressEvent.total)
						)
				},
			}
		)

		setUploading(false)
		setFile(undefined)
		setProgress(0)

		if (res.status === 200) {
			toast.success('File uploaded successfully!')
		} else {
			toast.error(res.data.message)
		}
	}

	return (
		<>
			<Toaster position='top-right' reverseOrder={false} />

			<form
				onSubmit={(event) => handleSubmit(event)}
				className='p-2 w-max space-y-2 mx-auto'>
				<label htmlFor='progress' className='block text-lg font-medium'>
					Progress
				</label>
				<progress
					id='progress'
					value={progress}
					max={100}
					className='w-full h-8 [&::-webkit-progress-bar]:rounded-md [&::-webkit-progress-value]:rounded-md [&::-webkit-progress-bar]:bg-slate-500 [&::-webkit-progress-bar]:bg-opacity-[0.125] [&::-webkit-progress-value]:bg-emerald-600 [&::-moz-progress-bar]:bg-emerald-600'>
					{progress}
				</progress>
				<label htmlFor='file-upload' className='block text-lg font-medium'>
					Upload File
				</label>
				<input
					type='file'
					name='file'
					id='file-upload'
					className='text-slate-500 font-medium pb-2'
					onChange={(event) => selectFile(event)}
				/>
				<button
					type='submit'
					disabled={!file || uploading}
					className='w-full font-medium rounded-lg bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 py-2 px-4 text-white disabled:bg-slate-400'>
					{uploading ? <span>Loading...</span> : <span>Submit</span>}
				</button>
			</form>
		</>
	)
}

export default Form
