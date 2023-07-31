'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MotionWrapper = ({ className, children }: { className: string, children: React.ReactNode }) => {
	return (
		<AnimatePresence>
			<motion.main
				className={`${className} max-[640px]:pt-[47px] pt-[65px]`}
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 100 }
				}}
				initial="hidden"
				animate="visible"
				exit="hidden"
				transition={{ duration: 0.2, delay: 0.1 }}
			>{children}</motion.main>
		</AnimatePresence>
	)
}

export default MotionWrapper