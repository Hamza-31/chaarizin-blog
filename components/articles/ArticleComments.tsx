import axios from '@/lib/axios'
import qs from '@/lib/queryString'
import React from 'react'
import TimeAgo from './TimeAgo'

const getData = async (slug: string) => {
	const params = qs.stringify(
		{
			filters: {
				article: {
					slug: {
						$eq: slug
					}
				}
			},
			fields: ["content", "createdAt"],
			pagination: {
				limit: 6,
			},
			populate: ["author"],
			sort: ['createdAt:desc'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		})
	try {
		const commentsResponse = await axios.get(`/api/comments?${params}`)
		const comments = commentsResponse.data.data.map(({ id, attributes }: { id: number, attributes: Record<string, any> }) => {
			return {
				id: id,
				content: attributes.content,
				createdAt: attributes.createdAt,
				author: attributes.author.data.attributes.username
			};
		});
		return {
			comments: comments
		}
	} catch (error) {
		console.log("Error Fetching Article Comments : ", error)
		return {
			comments: []
		}
	}
}

const generateColor = () => {
	const darkColors = [
		"#a92a21",
		"#7a2b9e",
		"#27384a",
		"#c93e05",
		"#de691a",
		"#ee8a12",
		"#ee8a12",
		"#20b18a",
		"#206bae",
		"#246aa6",
		"#829494",
		"#c44100",
		"#c73f05",
	];
	return darkColors[Math.floor(Math.random() * darkColors.length)];
};
const ArticleComments = async ({ slug }: { slug: string }) => {
	const { comments } = await getData(slug)
	if (comments.length === 0) {
		return
	}
	return (
		<section id="post-comments" className="pt-7 mt-7 md:w-3/5 w-4/5 mx-auto">
			<h3 className="text-4xl mb-5 text-dar-purple italic ml-1">Comments</h3>
			{comments.map((comment: { id: number, author: string, createdAt: string, content: string }) => (
				<div key={comment.id} className="p-2">
					<div className="">
						<span
							className={`rounded-full text-white text-center p-1 w-[30px] h-[30px] inline-block`}
							style={{ background: generateColor() }}
						>
							{comment.author[0].toUpperCase()}
						</span>
						<TimeAgo timestamps={comment.createdAt} />
					</div>
					<p className="break-words my-2 pb-1">{comment.content}</p>
					{comments.indexOf(comment) + 1 !== comments.length && (
						<hr className="w-48 h-[1px] mx-auto my-2 opacity-30 bg-dark-purple dark:bg-light-purple border-0 rounded md:my-10"></hr>
					)}
				</div>
			))}
		</section>
	)
}

export default ArticleComments