import MotionWrapper from '@/components/motions/MotionWrapper'
import React from 'react'

const JournalLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {

	return (
		<MotionWrapper className='min-h-screen'>
			{children}
		</MotionWrapper>
	)
}

export default JournalLayout