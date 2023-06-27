'use client'
import React, { useEffect } from 'react'
import SingleUserJournal from './SingleUserJournal'
import UserInfo from './UserInfo'
import { useSession } from 'next-auth/react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import Loader from '../Loader'
import Pagination from '../Pagination'
import Reveal from '../motions/Reveal'

const UserView = ({ journals, username, lastPage, page }: { journals: any, username: string, lastPage: boolean, page: number }) => {
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect(`/`)
		}
	}) as any
	const router = useRouter()
	useEffect(() => {
		if (session.data?.user?.username !== username) {
			router.push("/")
		}
	})
	if (session.data && session.data?.user?.username === username) {
		return (
			<>
				<UserInfo />
				{journals && (
					<div className="grid grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
						{journals.map((journal: { id: number }) => (
							<SingleUserJournal
								key={journal.id}
								journal={journal}
							/>
						))}
					</div>
				)}
				{journals && (
					<Pagination page={+page} lastPage={lastPage} />
				)}
			</>
		)
	}
	return (
		<div className="h-screen flex justify-center items-center">
			<Loader size='w-5 h-5' />
		</div>
	)
}

export default UserView