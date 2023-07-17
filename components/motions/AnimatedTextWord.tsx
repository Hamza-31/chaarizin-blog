'use client'
import React from "react";
import { motion } from "framer-motion";
const AnimatedTextWord = ({ text, className }: any) => {
	// This will split the text into an array of word 
	const words = text.split(" ");
	// const letters = Array.from(text);
	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.03, delayChildren: 0.1 * i },
		}),
	};

	const child = {
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			x: -20,
			y: 10,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
			},
		},
	};
	return (
		<motion.div
			className="w-4/5 my-10 mx-auto font-pecita break-keep"
			style={{ overflow: "", display: "flex", flexWrap: "wrap", fontSize: "2rem" }}
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{words.map((word: string, index: any) => (

				<motion.p className="sm:text-7xl text-5xl inline-block text-dark-purple" variants={child} key={index} style={{ marginRight: "5px" }}>
					{word.split("").map((letter: string) => (

						<motion.span
							variants={child}
							style={{ marginRight: "5px" }}
							key={index}
						>
							{letter === "," ? <>, <strong>Curlies</strong>, </> : letter}
						</motion.span>
					))}&nbsp;

				</motion.p>
			))}
		</motion.div>
	);
};

export default AnimatedTextWord;