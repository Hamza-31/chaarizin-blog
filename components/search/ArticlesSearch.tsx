"use client"
import { getAssetURL } from '@/lib/getAssetUrl'
import Image from 'next/image'
import React, { Suspense } from 'react'
import CreatedAt from '../articles/CreatedAt'
import Link from 'next/link'
import { Configure, Highlight, Hits, InstantSearch, Pagination, RefinementList, SearchBox, SortBy, Stats, } from 'react-instantsearch-hooks-web'
import { instantMeiliSearch, FacetDistribution } from '@meilisearch/instant-meilisearch'
import CustomRefinementList from './CustomRefinementList'
import CustomSearchBox from './CustomSearchBox'
import CustomSortBy from './CustomSortBy'
import CustomPagination from './CustomPagination'
import Loader from '../Loader'
import Reveal from '../motions/Reveal'

const meilisearchHost = process.env.NEXT_PUBLIC_MEILISEARCH_HOST
const masterKey = process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY

const searchClient = instantMeiliSearch(meilisearchHost as string, masterKey,
	{
		finitePagination: true,
		primaryKey: 'id',
		keepZeroFacets: true,
	})

const ArticlesSearch = () => {

	return (
		<section id="search" className='ais-InstantSearch relative'>
			<InstantSearch
				indexName="article"
				searchClient={searchClient}
			>
				<Configure hitsPerPage={6}
					attributesToSnippet={['content:30']}
					snippetEllipsisText={'...'} />
				<div className='px-4'>

					<div className="pt-4  grid min-[1024px]:grid-cols-3 grid-cols-2 max-[600px]:grid-cols-1">
						<CustomRefinementList sortBy={["name:asc"]} attribute="category" />

						<div>

							<CustomSearchBox />
							{/* <CustomSortBy
								items={[
									{
										value: 'article:createdAt:desc',
										label: 'Recent Articles',
									},
									{
										value: 'article',
										label: 'Relevent',
									}
								]}
							/> */}
						</div>
					</div>
				</div>
				<h2 id='displayed-content' className='ml-3 min-[1024px]:text-4xl text-3xl mt-11 mb-0 text-red'>
					Recent Articles
				</h2>
				<Hits hitComponent={Hit} />
				<CustomPagination />


			</InstantSearch>
		</section>
	)
}
const Hit = ({ hit }: any) => {
	return (

		<article
			key={hit.id}
			id={hit.id.toString()}
			className="max-w-[300px] py-3 h-fit mx-auto hover:scale-103 transition ease-in-out duration-200"
		>
			<CreatedAt createdAt={hit.createdAt} />
			<Link href={`/blog/${hit.slug}`}>
				<div
					className=" border-2 border-dark-purple dark:border-beige relative w-[300px] h-[200px]"
				>
					<Image
						className="object-cover object-center"
						fill
						sizes='100vw'
						src={`${getAssetURL(hit.postImage.formats.small.url)}`}
						alt={hit.title}

					/>
				</div>

				<span className="bg-dark-purple dark:font-bold dark:bg-beige font-patrickHand px-2 block w-[100px] text-center text-sm text-white dark:text-dark-purple">
					{hit.category}
				</span>
				<div>
					<h5 className="mt-3 text-center font-bold text-2xl tracking-tight mb-2">
						<Highlight attribute="title" hit={hit} />
					</h5>
					<p className="break-all">
						<Highlight attribute="content" hit={hit} />
					</p>
				</div>
			</Link>
		</article>

	)
}

export default ArticlesSearch