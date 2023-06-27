import { getAssetURL } from "@/lib/getAssetUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileArticles from "./MobileArticles";
import qs from "@/lib/queryString";
import axios from "@/lib/axios";

interface Article {
	id: number;
	slug: string;
	postImage: { data: { attributes: { formats: { small: { url: string; }; }; }; }; };
	title: string
}

// interface MoreReadsProps {
// 	moreReadsArticles: Article[]
// }

const getData = async () => {
	const params = qs.stringify(
		{
			fields: [
				"id",
				"title",
				"slug",
				"createdAt",
				"excerpt",
			],
			pagination: {
				start: 3,
				limit: 3,
				// page: page,
				// pageSize: 6,
			},
			populate: ["postImage",],
			sort: ['createdAt:desc'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		})
	try {
		const moreReadsResponse = await axios.get(`/api/articles?${params}`)

		const { data } = moreReadsResponse.data;
		const articles = data.map(({ id, attributes }: { id: number, attributes: Record<string, any> }) => {
			return { id, ...attributes };
		});

		return {
			articles: articles ?? []
		} as any;
	} catch (error) {
		console.log("Error Fetching More Reads: ", error);
		return {
			articles: []
		};
	}
}

const MoreReads = async () => {
	const { articles } = await getData()
	return (
		<aside className="pt-7 mt-7 mx-auto">
			<h3 className="text-4xl mb-5 italic max-[1024px]:ml-1">more reads</h3>
			<div className="hidden lg:block">
				<div className="flex justify-between">
					{articles.map((article: Article) => (
						<article
							key={article.id}
							className="mb-5 w-[300px] min-h-[300px] place-self-center "
						>
							<Link
								href={`/blog/${article.slug}`}
							>
								<div
									className=" border-2 border-dark-purple dark:border-beige relative w-[300px] h-[200px] overflow-hidden flex items-center"
								>
									<Image
										className="object-cover object-center"
										src={`${getAssetURL(article.postImage.data.attributes.formats.small.url)}`}
										alt={article.title}
										width={300}
										height={200}
										priority={false}
									/>
								</div>
								<div className="p-5">
									<h3 className="text-center font-bold text-2xl tracking-tight mb-2">
										{article.title}
									</h3>
								</div>
							</Link>
						</article>
					))}
				</div>
			</div>
			<MobileArticles articles={articles} images={articles.map((article: Article) => {
				return { id: article.id, src: getAssetURL(article.postImage.data.attributes.formats.small.url) }
			})} />
		</aside>
	);
};

export default MoreReads;
