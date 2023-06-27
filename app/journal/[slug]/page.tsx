import BreadCrumb from '@/components/BreadCrumb'
import NewsLetter from '@/components/NewsLetter'
import TimeAgo from '@/components/articles/TimeAgo'
import MotionWrapper from '@/components/motions/MotionWrapper'
import Reveal from '@/components/motions/Reveal'
import axios from '@/lib/axios'
import qs from '@/lib/queryString'
import React from 'react'


const getData = async (slug: string) => {
	const params = qs.stringify(
		{
			fields: ["title", "slug", "content", "createdAt"],
			populate: ["author"],

		},
		{
			encodeValuesOnly: true, // prettify URL
		})
	try {
		const journalResponse = await axios.get(`/api/journals/${slug}?${params}`)
		const journal = {
			id: journalResponse.data.data.id,
			title: journalResponse.data.data.attributes.title,
			createdAt: journalResponse.data.data.attributes.createdAt,
			content: journalResponse.data.data.attributes.content,
			author: journalResponse.data.data.attributes.author.data.attributes.username,
		};
		console.log("journalResponse : ", journal)
		return {
			journal: journal
		}
	} catch (error) {
		console.log("Error Fetching Single Article: ", error);
		return {
			journal: {}
		};
	}
}


const SingleJournal = async ({ params }: { params: { slug: string } }) => {
	const { journal } = await getData(params.slug.toString()) as any
	return (

		<MotionWrapper>
			<BreadCrumb postTitle={journal.title} page="Journal" />
			<article className="py-16 px-12 max-[500px]:px-4 drop-shadow-lg bg-beige dark:bg-dark-purple mt-20 min-[720px]:w-[700px] mx-auto border border-beige rounded">
				<h1 className="text-xl w-4/5 mx-auto text-center font-bold">
					{journal.title}
				</h1>
				<p className="text-center my-7 w-full break-words">
					{journal.content}
				</p>
				<div className="flex justify-between pt-5">
					<p>
						<TimeAgo timestamps={journal.createdAt} />
					</p>
					<p>
						<em>author: </em>
						<strong> {journal.author}</strong>
					</p>
				</div>
			</article>
			<NewsLetter />
		</MotionWrapper>
	)
}

export default SingleJournal


export async function generateMetadata({ params }: { params: { slug: string } }) {
	try {
		const { journal } = await getData(params.slug.toString()) as any
		if (!journal) {
			return {
				title: 'Not Found',
				description: "The page you're looking for does not exists."
			}
		}
		return {
			title: journal.title,
			description: journal.content.substring(0, 100).length >= 100
				? `${journal.content.substring(0, 100)}...`
				: journal.content.substring(0, 100),
			alternates: {
				canonical: `/journal/${journal.slug}`
			}
		}
	} catch (error) {

		return {
			title: 'Not Found',
			description: "The page you're looking for does not exists."
		}
	}
}

export async function generateStaticParams() {
	try {
		const journals = await axios.get('/api/journals')
		return journals.data.data.map((journal: { slug: string }) => { slug: journal.slug })
	} catch (error) {
		console.log("Error generating Static Params for Journal: ", error);
		return []
	}
}