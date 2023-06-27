import MotionWrapper from '@/components/motions/MotionWrapper'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const AboutLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {

	return (
		<main className='max-w-screen-xl min-h-screen mx-auto'>
			<MotionWrapper>
				{children}
			</MotionWrapper>
		</main>

	)
}

export default AboutLayout