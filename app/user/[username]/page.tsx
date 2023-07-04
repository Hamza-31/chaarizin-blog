import SingleUserJournal from '@/components/user/SingleUserJournal'
import UserInfo from '@/components/user/UserInfo'
import UserView from '@/components/user/UserView'
import axios from '@/lib/axios'
import qs from '@/lib/queryString'
import React from 'react'


const getData = async (username: string, page: number) => {
	const params = qs.stringify(
		{
			filters: {
				author: {
					username: {
						$eq: username
					}
				}
			},
			fields: ["title", "slug", "content"],
			pagination: {
				page: page,
				pageSize: 6,
			},
			sort: ['createdAt:desc'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		})

	try {
		const journalsResponse = await axios.get(`/api/journals?${params}`)
		const meta = journalsResponse.data.meta
		const journals = journalsResponse.data.data.map(({ id, attributes }: { id: number, attributes: Record<string, any> }) => {
			return {
				id: id,
				title: attributes.title,
				slug: attributes.slug,
				content: attributes.content,
			};
		});
		return {
			journals: journals,
			meta: meta
		}
	} catch (error) {
		console.log("Error Fetching Journals : ", error)
		return {
			journals: [],
			meta: []
		}
	}
}
const UserPage = async ({ params, searchParams }: { params: { username: string }, searchParams: { page: string } }) => {
	const username = decodeURI(params.username)
	const page = +searchParams.page || 0
	const { journals, meta } = await getData(username, page)
	return (
		<div className="max-[500px]:px-1 py-12 min-h-screen max-[420px]:w-full w-4/5 mx-auto">
			<UserView journals={journals} page={page} lastPage={meta.pagination.pageCount === meta.pagination.page} username={username} />
		</div>
	)
}

export default UserPage