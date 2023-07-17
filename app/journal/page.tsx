import SocialLinks from '@/components/SocialLinks'
import Link from 'next/link'
import React from 'react'
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import qs from '@/lib/queryString';
import axios from '@/lib/axios';
import Pagination from '@/components/Pagination';
import Reveal from '@/components/motions/Reveal';
import AnimatedTextWord from '@/components/motions/AnimatedTextWord';

const getData = async (page: number) => {
	const params = qs.stringify(
		{
			fields: ["title", "slug"],
			pagination: {
				page: page,
				pageSize: 10,
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
				<section className="w-full py-7 bg-beige dark:bg-gradient-to-r dark:from-[#b2aa9d] dark:via-[#aba291] dark:to-[#90846c] min-h-[500px] relative flex justify-center items-center flex-col space-y-40">
					{/* <div className="min-[1094px]:block hidden absolute top-0 -left-7">
						<SocialLinks grid='' color="#463F66" />
					</div> */}
					<div className="w-full">
						{/* <p className="w-4/5 my-10 mx-auto sm:text-7xl text-5xl text-dark-purple font-pecita">
							Every life is different but we, <strong>Curlies</strong>, share a
							lot in common
						</p> */}
						<AnimatedTextWord text="Every life is different but we, share a lot in common." />
					</div>
					<div className="">
						<Link className="underline text-dark-purple text-md mb-5" href="/journal/create">
							<PlusSmallIcon className="h-6 w-6 inline-block" />Drop your thoughts here
						</Link>
					</div>
				</section>
			)}

			<section className='max-w-screen-xl min-h-[500px] mx-auto my-20'>



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