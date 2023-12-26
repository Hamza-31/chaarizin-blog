
import BreadCrumb from "@/components/BreadCrumb";
import Loader from "@/components/Loader";
import NewsLetter from "@/components/NewsLetter";
import AddComment from "@/components/articles/AddComment";
import ArticleComments from "@/components/articles/ArticleComments";
import MoreReads from "@/components/articles/MoreReads";
import axios from "@/lib/axios";
import { getAssetURL } from "@/lib/getAssetUrl";
import qs from "@/lib/queryString";
import Markdown from "markdown-to-jsx";
import Image from "next/image";

import React, { Suspense } from "react";

const getData = async (slug: string) => {
	const params = qs.stringify(
		{
			fields: [
				"id",
				"title",
				"slug",
				"createdAt",
				"excerpt",
				"content"
			]
		},
		{
			encodeValuesOnly: true, // prettify URL
		})
	try {
		const articleResponse = await axios.get(`/api/articles/${slug}?${params}`)
		const article = { id: articleResponse.data.data.id, ...articleResponse.data.data.attributes };
		return {
			article: article
		}
	} catch (error) {
		console.log("Error Fetching Single Article: ", error);
		return {
			article: {}
		};
	}
}



const ArticlePage = async ({ params }: { params: { slug: string } }) => {
	const { article } = await getData(params.slug.toString())
	const CustomImage = ({ alt, src }: { alt: string, src: string }) => (
		<Image
			alt={alt}
			src={src.startsWith("/") ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}` : src}
			width={390}
			height={390}
			priority={false}
		/>
	);
	return (
		<>
			<section className="mx-auto max-w-7xl max-w-screen-lg">
				<BreadCrumb postTitle={article?.title} page="Blog" />
				<article className="mb-7">

					<div className="flex items-center h-[300px] max-[1024px]:h-[200px] max-[640px]:h-[150px] overflow-hidden relative mb-5">
						<Image
							className=""
							src={`${getAssetURL(article?.postImage.data.attributes.formats.large.url)}`}
							alt={article?.title}
							width={1024}
							height={300}
							priority={true}
						/>
					</div>

					<div className="w-3/5 max-[700px]:w-4/5  mx-auto max-[500px]:w-full max-[500px]:px-5">

						<div className=" max-[500px]:-top-28 right-0 left-0 max-[500px]:mx-6  px-1 pb-7 flex flex-col justify-center items-center border-b-[1px] border-dark-purple dark:border-light-purple">
							<h1 className="py-5 px-2 uppercase lg:text-5xl text-center md:text-3xl text-3xl drop-shadow-lg">
								{article?.title}
							</h1>
							<h2 className="text-xl px-2 mt-3 text-center">{article?.subtitle}</h2>
						</div>
						<div
							className={`
										mx-auto 
										py-7
										prose-li:marker:text-neo-purple prose-li:dark:text-white 
										prose prose-p:dark:text-white min-[900px]:prose-p:w-[560px] prose-p:break-normal
										prose-em:dark:text-beige prose-em:text-dark-purple
										prose-strong:dark:text-white prose-strong:text-dark-purple
										prose-headings:text-dark-purple prose-headings:dark:text-beige
										prose-blockquote:text-dark-purple prose-blockquote:dark:border-light-purple
										prose-a:text-neo-purple prose-a:dark:text-light-purple prose-a:break-words
										prose-img:rounded-[100px] min-[600px]:prose-img:max-w-[393px] prose-img:mx-auto prose-img:block
		`}
						>
							<Markdown
								options={{
									overrides: {
										img: {
											component: CustomImage,

										},
									},
								}}
							>{article?.content}</Markdown>
						</div>
						<hr className="w-3/5 mx-auto bg-dark-purple mt-11" />

					</div>
				</article>

				<AddComment articleId={article?.id} />
				<Suspense fallback={<Loader size="w-5 h-5" />}>
					{/* @ts-expect-error Server Component */}
					<ArticleComments slug={article.slug} />
				</Suspense>

				<hr className="w-2/5 h-[1px] mx-auto mt-5 opacity-30 dark:bg-light-purple bg-dark-purple border-0 rounded md:my-10"></hr>
				{/* // Suggest By keywords */}
				<Suspense fallback={<Loader size="w-5 h-5" />}>
					{/* @ts-expect-error Server Component */}
					<MoreReads />
				</Suspense>
				<NewsLetter />

			</section>
		</>
	);
};

export default ArticlePage;

export async function generateMetadata({ params }: { params: { slug: string } }) {
	try {
		const { article } = await getData(params.slug.toString())
		if (!article) {
			return {
				title: 'Not Found',
				description: "The page you're looking for does not exists."
			}
		}
		return {
			title: article.title,
			description: article.excerpt.substring(0, 100).length >= 100
				? `${article.excerpt.substring(0, 100)}...`
				: article.excerpt.substring(0, 100),
			alternates: {
				canonical: `/blog/${article.slug}`
			}
		}
	} catch (error) {
		console.log("Error generating Metadata : ", error)
		return {
			title: 'Not Found',
			description: "The page you're looking for does not exists."
		}
	}
}

export async function generateStaticParams() {
	try {
		const articles = await axios.get('/api/articles')
		return articles.data.data.map((article: { slug: string }) => { slug: article.slug })
	} catch (error) {
		console.log("Error generating Statis Params for Articles: ", error);
		return []
	}
}