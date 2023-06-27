import Loader from '@/components/Loader'
import React from 'react'

const HomeLoading = () => {
	return (
		<div className="h-screen flex justify-center items-center">
			<Loader size='w-5 h-5' />
		</div>
	)
}

export default HomeLoading