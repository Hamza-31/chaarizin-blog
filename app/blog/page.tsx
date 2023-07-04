
import React, { Suspense } from 'react'
import NewsLetter from '@/components/NewsLetter';
import ArticlesSearch from '@/components/search/ArticlesSearch';


const BlogPage = () => {
	return (
		<>
			<section className=" relative my-5 flex flex-col justify-start h-32 min-[1024px]:h-40 items-center">
				<h2 className="uppercase lg:text-6xl md:text-5xl text-4xl">
					Blog
				</h2>

			</section>
			<ArticlesSearch />

			<aside className="mx-auto max-w-7xl max-w-screen-lg">
				<NewsLetter />
			</aside>

		</>
	)
}

export default BlogPage

