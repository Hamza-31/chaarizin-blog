
import React, { Suspense } from 'react'
import NewsLetter from '../NewsLetter'
import Loader from '../Loader'
import InstaFeed from '../social-posts/InstaFeed'

const Aside = () => {
	return (
		<aside
			id="newsletter"
			className="mx-auto min-h-screen mb-10 max-w-7xl max-w-screen-lg"
		>
			<NewsLetter />
			<Suspense fallback={<Loader size="w-5 h-5" />}>
				{/* @ts-expect-error Server Component */}
				<InstaFeed />
			</Suspense>
		</aside>
	)
}

export default Aside