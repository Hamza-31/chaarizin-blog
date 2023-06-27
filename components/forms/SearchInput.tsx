"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchInput = () => {
	const [requestParams, setRequestParams] = useState({
		query: ""
	})
	const router = useRouter()
	const path = usePathname()
	const searchParams = useSearchParams()
	const categories = searchParams.get('category')?.toString() || ""
	const page = searchParams.get('page')?.toString() || ""
	useEffect(() => {
		if (requestParams.query.length === 0 && (categories.length === 0 && page.length === 0)) router.push(path)
	})
	const selectArticlesByQuery = (obj: { query: string }, hasPage: boolean, hasQuery: boolean, hasCategory: boolean) => {
		const encodedSearchQuery = encodeURI(obj.query)
		router.push(`${path}?query=${encodedSearchQuery}`)

	}
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				const formData = new FormData(e.target as HTMLFormElement)
				const obj = {
					query: formData.get("query")?.toString() ?? "",
				}
				selectArticlesByQuery(obj, searchParams.has('page'), searchParams.has('query'), searchParams.has('category'))
			}}
			className=''>
			<label htmlFor="query" className="mb-2 text-sm font-medium relative">

				<div className="z-10 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="#463F66" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
				</div>
				<input onChange={(e) => setRequestParams({ query: e.target.value })} type="search" id="query" name='query' className="opacity-70 hover:opacity-100 focus:outline-none focus:opacity-100 transition ease-in-out duration-200 bg-beige rounded text-dark-purple block w-full p-4 pl-10 text-sm" placeholder="Moisture, Oil ..." required />
				<button type="submit" className="absolute p-2 right-2.5 bottom-1.5 text-beige rounded bg-dark-purple">Search</button>

			</label>
		</form>
	)
}

export default SearchInput