import MotionWrapper from '@/components/motions/MotionWrapper'
import React from 'react'

const JournalLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {

	return (
		<main className='min-h-screen'>
			<MotionWrapper>
				{children}
			</MotionWrapper>
		</main>
	)
}

export default JournalLayout