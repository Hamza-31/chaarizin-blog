import React, { Suspense } from 'react'
import Reveal from '../motions/Reveal'
import Loader from '../Loader'
import LatestPosts from '../articles/LatestArticles'

const Articles = () => {
	return (
		<Suspense fallback={<div className='min-h-[400px] flex justify-center items-center'><Loader size="w-5 h-5" /></div>}>
			{/* @ts-expect-error Server Component */}

			<LatestPosts />
		</Suspense>

	)
}

export default Articles