
import { getAssetURL } from "@/lib/getAssetUrl";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import MobileArticles from "./MobileArticles";
import qs from "@/lib/queryString";
import axios from "@/lib/axios";
import ScaleMotion from "../motions/ScaleMotion";
// interface Post {
// 	id: number;
// 	slug: string;
// 	postImage: string;
// 	title: string;
// }

// interface LatestPostsProps {
// 	posts: Post[];
// }

const getData = async () => {
	const params = qs.stringify(
		{
			fields: ["title", "slug"],
			pagination: {
				limit: 3,
			},
			populate: ["postImage"],
			sort: ['createdAt:desc'],
		},
		{
			encodeValuesOnly: true, // prettify URL
		})
	try {
		const res = await axios.get(`/api/articles?${params}`)
		const { data, meta } = res.data;
		const articles = data.map(({ id, attributes }: { id: number, attributes: Record<string, any> }) => {
			return { id, ...attributes };
		});
		return {
			articles: articles ?? [],
			meta: meta ?? []
		};
		// return {}
	} catch (error) {
		console.log("Error Fetching Latest Articles: ", error);
		return {
			articles: [],
			meta: []
		};
	}
};


interface Article { id: number; slug: string; postImage: { data: { attributes: { formats: { small: { url: string; }; }; }; }; }; title: string }

const LatestPosts = async () => {
	const { articles, meta } = await getData()

	return (
		<section className="px-0 min-[400px]:px-5 pt-5 mx-auto  max-w-7xl max-w-screen-lg my-10">
			<h2
				className={`text-4xl max-[640px]:text-3xl mb-12 max-[1024px]:ml-2 text-center`}
			>
				Latest Articles
			</h2>
			<div className="hidden lg:block">
				<div className="grid min-[1024px]:grid-cols-3 min-[720px]:grid-cols-2 grid-cols-1 grid-flow-row ">
					{articles.length !== 0 && articles.map((article: Article) => (
						<ScaleMotion key={article.id} >
							<article className="mb-5 w-80 mx-auto h-fit">
								<Link
									href={`/blog/${article.slug}`}
								// href={{
								// 	pathname: "/blog/[slug]",
								// 	query: { id: post.id, slug: post.slug },
								// }}
								// as={`/blog/${post.slug}`}
								>
									<div
										className="border-2 border-dark-purple dark:border-beige relative w-[300px] h-[200px]"
									>
										<Image
											className="object-cover object-center"
											src={`${getAssetURL(article.postImage.data.attributes.formats.small.url)}`}
											fill
											alt={article.title}
											priority={true}
										/>
									</div>
									<div className="p-5">
										<h3 className=" text-center text-2xl tracking-tight mb-2">
											{article.title}
										</h3>
									</div>
								</Link>
							</article>
						</ScaleMotion>
					))}
				</div>
			</div>
			{/* <div className="lg:hidden mx-auto relative h-[340px] px-4 flex justify-center ">
				Mobile
			</div> */}
			<MobileArticles articles={articles} images={articles.map((article: Article) => {
				return { id: article.id, src: getAssetURL(article.postImage.data.attributes.formats.small.url) }
			})} />
		</section>
	);
};

export default LatestPosts;
