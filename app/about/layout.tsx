import MotionWrapper from '@/components/motions/MotionWrapper'
import React from 'react'

const AboutLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {

	return (
		<MotionWrapper className='max-w-screen-xl min-h-screen mx-auto'>
			{children}
		</MotionWrapper>

	)
}

export default AboutLayout