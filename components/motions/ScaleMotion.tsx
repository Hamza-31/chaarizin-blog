"use client"
import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from "framer-motion";
type MyRevealProps = {
	children: React.ReactNode,
	// hidden: { opacity: number, x: number, y: number },
	// visible: { opacity: number, x: number, y: number },
	// transition: { duration: number, delay: number }
}

const ScaleMotion = ({ children, }: MyRevealProps) => {

	return (
		<motion.div
			whileHover={{ scale: 1.01 }}
			transition={{ duration: 0.2, delay: 0 }}

		>{children}</motion.div>
	)
}

export default ScaleMotion