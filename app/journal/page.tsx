import SocialLinks from '@/components/SocialLinks'
import Link from 'next/link'
import React from 'react'
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import qs from '@/lib/queryString';
import axios from '@/lib/axios';
import Pagination from '@/components/Pagination';
import Reveal from '@/components/motions/Reveal';

const getData = async (page: number) => {
	const params = qs.stringify(
		{
			// filters: {
			// 	article: {
			// 		slug: {
			// 			$eq: slug
			// 		}
			// 	}
			// },
			fields: ["title", "slug"],
			pagination: {
				page: page,
				pageSize: 6,
			},
			// populate: ["author"],
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
			meta: {}
		}
	}
}

const JournalPage = async ({ searchParams }: { searchParams: { page: string } }) => {
	const page = +searchParams.page || 0
	const { journals, meta } = await getData(page)
	return (
		<>

			{page === 0 && (
				<section className="w-full bg-dark-purple min-h-[500px] relative flex justify-center items-center flex-col space-y-40">
					<div className="min-[1094px]:block hidden absolute top-0 -left-7">
						<SocialLinks grid='' color="#463F66" />
					</div>
					<div>
						<h2 className="tracking-wider uppercase text-5xl max-[380px]:text-4xl  text-red drop-shadow-2xl">
							Curl Club
						</h2>
						<svg
							className="mx-auto mt-2"
							width="197"
							height="21"
							viewBox="0 0 197 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M195.588 11.75C185.179 14.4266 176.43 11.6706 167.031 8.27566C160.625 5.96191 158.867 13.2844 154.38 17.2256C149.673 21.3598 143.8 20.2848 139.394 17.4215C137.447 16.156 126.859 4.08323 125.276 5.32515C121.951 7.93338 119.33 12.8733 116.768 16.2575C113.639 20.3917 108.198 13.3135 106.095 11.4481C101.31 7.20309 96.3061 -1.10667 89.36 4.80719C84.6678 8.80205 75.3564 20.8754 68.7214 20.0827C62.6429 19.3565 57.7131 11.2404 54.6893 6.64179C51.3605 1.57932 50.718 -1.74659 45.0331 2.79464C43.4625 4.04925 38.6249 8.71412 36.4413 7.38113C34.3894 6.12854 35.4344 1.87456 33.1069 0.947225C30.1968 -0.212181 23.4928 10.8764 22.1142 12.6265C18.1912 17.6068 16.6222 19.2749 11.9134 15.8028C10.0252 14.4105 2.97083 6.09258 0.999992 8.69649"
								stroke="#FFBEBE"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<div className="">
						<Link className="underline text-beige text-md" href="/journal/create">
							<PlusSmallIcon className="h-6 w-6 inline-block" />Drop your thoughts here
						</Link>
					</div>
				</section>
			)}

			<section className='max-w-screen-xl min-h-screen mx-auto mb-20'>

				<p className="w-4/5 my-10 py-10 mx-auto sm:text-7xl text-5xl font-pecita">
					Every life is different but we, <strong>curlies</strong>, share a
					lot in common
				</p>

				{journals.length !== 0 && (

					<div className="max-[420px]:w-full w-4/5 max-[500px]:px-2 py-6 mx-auto grid grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
						{journals?.map((journal: { id: number, slug: string, title: string }) => (

							<Link
								className="bg-beige dark:text-dark-purple max-[1024px]:mx-1 mx-2 my-2 px-3 flex items-center justify-center py-3 m-2 overflow-hidden py-5 px-3 rounded  border border-dark-purple hover:scale-103 hover:shadow-md transition duration-200 ease-in-out"
								key={journal.id}
								href={`/journal/${journal.slug}`}
							>
								<article className="">
									<h3 className="text-center ">{journal.title}</h3>
								</article>
							</Link>
						))}
					</div>
				)}
				{journals.length !== 0 && (
					<Pagination page={page} lastPage={meta.pagination.pageCount === meta.pagination.page} />
				)}
			</section>
		</>
	)
}

export default JournalPage