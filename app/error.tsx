'use client'
import React from 'react'

const error = ({ error, reset }: { error: Error, reset: () => void }) => {
	return (

		<main className="h-screen">
			<div className="flex items-center justify-center min-h-screen bg-dark-purple">
				<div className="col-sm-8 text-gray-50 text-center -mt-52">

					<h5 className="text-gray-300 text-5xl font-patrickHand font-semibold ">
						Something went wrong !
					</h5>
					<div> <button className='font-patrickHand text-xl mt-10 underline' onClick={reset}>Please try again!</button></div>
				</div>
			</div>
		</main>
	)
}

export default error