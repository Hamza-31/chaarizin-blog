"use client"
import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from "framer-motion";
type MyRevealProps = {
	children: React.ReactNode,
	hidden: { opacity: number, x: number, y: number },
	visible: { opacity: number, x: number, y: number },
	transition: { duration: number, delay: number }
}

const Reveal = ({ children, hidden, visible, transition }: MyRevealProps) => {

	return (
		<motion.div
			variants={{
				hidden: hidden,
				visible: visible
			}}
			initial="hidden"
			animate="visible"
			transition={transition}
		>
			{children}
		</motion.div>

	)
}

export default Reveal