'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<AnimatePresence>
			<motion.div
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 100 }
				}}
				initial="hidden"
				animate="visible"
				exit="hidden"
				transition={{ duration: 0.2, delay: 0.1 }}
			>{children}</motion.div>
		</AnimatePresence>
	)
}

export default MotionWrapper