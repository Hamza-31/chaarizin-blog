import Loader from '@/components/Loader'
import React from 'react'

const EmptyPage = () => {
	return (
		<div className="h-screen flex justify-center items-center">
			<Loader size='w-5 h-5' />
		</div>
	)
}

export default EmptyPage