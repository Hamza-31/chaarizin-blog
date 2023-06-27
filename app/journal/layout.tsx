import MotionWrapper from '@/components/motions/MotionWrapper'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const JournalLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {

	return (
		<main>
			<MotionWrapper>
				{children}
			</MotionWrapper>
		</main>
	)
}

export default JournalLayout