import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreatedAt from "./CreatedAt";
import { getAssetURL } from "@/lib/getAssetUrl";
import search from '../../public/icons/search_icon.svg'
import qs from "@/lib/queryString";
import axios from "@/lib/axios";
import Pagination from "../Pagination";
import SearchInput from "../forms/SearchInput";

const getData = async (categories: String[], start: number, page: number, query: string) => {
	const strapiQuery = {

		filters: {
			category: {
			},
			$or: [
				{
					content: {

					},
					title: {

					}
				}
			],
		},
		fields: [
			"id",
			"title",
			"slug",
			"createdAt",
			"excerpt",
		],
		pagination: {
			// start: start,
			// limit: 6,
			page: page,
			pageSize: 6,
		},
		populate: ["postImage", "category"],
		sort: ['createdAt:desc'],
	}
	if (categories.length !== 0) strapiQuery["filters"]["category"] = { name: { $in: categories } }
	if (query.length !== 0) strapiQuery["filters"]["$or"] = [{ title: { $containsi: decodeURI(query) }, content: { $containsi: decodeURI(query) } }]

	const params = qs.stringify(strapiQuery, { encodeValuesOnly: true, })
	try {
		const articlesResponse = await axios.get(`/api/articles?${params}`)
		const { data, meta } = articlesResponse.data;
		const articles = data.map(({ id, attributes }: { id: number, attributes: Record<string, any> }) => {
			return { id, ...attributes };
		});

		return {
			articles: articles ?? [],
			meta: meta ?? []
		};
	} catch (error) {
		console.log("Error Fetching Latest Articles: ", error);
		return {
			articles: [],
			meta: []
		};
	}
};


interface Article {
	id: number;
	createdAt: string;
	slug: string;
	excerpt: string;
	postImage: { data: { attributes: { formats: { small: { url: string; }; }; }; }; };
	category: { data: { attributes: { name: string }; }; };
	title: string
}

const RecentArticles = async ({ categories, start, page, query }: { categories: string[], start: number, page: number, query: string }) => {
	const { articles, meta } = await getData(categories, start, page, query)
	// const lastPage = Math.ceil(meta.pagination.total / 6);
	const totalFetchedArticles = meta.pagination.total
	return (
		// <div>the articles</div>
		<section className="px-5 mx-auto">
			{categories.length === 0 && (
				<div className="mx-auto max-w-7xl  max-w-screen-xl md:max-w-screen-xs grid grid-cols-3 gap-4 ">


					{query.length === 0 ?
						<h2 className='min-[1024px]:text-4xl text-3xl mb-2 text-red col-span-2'>
							Recent Articles
						</h2>
						: articles.length === 0 ?
							(<div className="min-[1024px]:text-4xl text-3xl mb-2 col-span-2">
								No results for : <span className="text-red">{decodeURI(query)}</span>
							</div>)
							:
							(<div className="min-[1024px]:text-4xl text-3xl mb-2 col-span-2">
								{totalFetchedArticles === 1 ? `${totalFetchedArticles} Result` : `${totalFetchedArticles} Results`}  for : <span className="text-red">{decodeURI(query)}</span>
							</div>)
					}
					{/* <Image className="inline ml-3 scale-125 cursor-pointer rounded-xl" src={search} alt="search" /> */}

					<SearchInput />
				</div>
			)}
			<div className="grid md:grid-cols-2  grid-cols-1 grid-flow-row ">
				{articles.map((article: Article) => (
					<article
						key={article.id}
						id={article.id.toString()}
						className="max-w-[300px] py-3 h-fit mx-auto hover:scale-103 hover:opacity-90 transition ease-in-out duration-200"
					>
						<CreatedAt createdAt={article.createdAt} />
						<Link href={`/blog/${article.slug}`}>
							<div
								className=" border-2 border-dark-purple dark:border-beige relative w-[300px] h-[200px]"
							>
								<Image
									className="object-cover object-center"
									fill
									src={`${getAssetURL(article.postImage.data.attributes.formats.small.url)}`}
									alt={article.title}

								/></div>

							<span className="bg-dark-purple dark:font-bold dark:bg-beige font-patrickHand px-2 block w-[100px] text-center text-sm text-white dark:text-dark-purple">
								{article.category.data.attributes.name}
							</span>
							<div>
								<h5 className="mt-3 text-center font-bold text-2xl tracking-tight mb-2">
									{article.title}
								</h5>
								<p className="break-all">
									{article.excerpt.substring(0, 132).concat(" ...")}
								</p>
							</div>
						</Link>
					</article>
				))}
			</div>
			{articles.length !== 0 && (
				<Pagination page={page} lastPage={meta.pagination.pageCount === meta.pagination.page} />
			)}
		</section>
	);
};

export default RecentArticles;
