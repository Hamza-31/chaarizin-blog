'use client'
import React from 'react'
import SocialLinks from '../SocialLinks'
import Reveal from '../motions/Reveal'
import { Gaegu } from 'next/font/google'

const gaegu = Gaegu({ subsets: ['latin'], weight: '400' })

const Hero = () => {
	return (

		<section
			className="bg-gradient-to-r from-[#b2aa9d] via-[#aba291] to-[#90846c]  relative h-[381px] mx-auto  max-w-7xl max-w-screen-lg"
		>
			<div className="min-[1094px]:block hidden absolute top-0 -left-7">
				<SocialLinks grid="" color="" />
			</div>
			<div className=" flex justify-center items-center absolute top-0 bottom-0 right-0 left-0 inset-0 bg-center  bg-hero-chaarizin bg-no-repeat">
				<Reveal
					hidden={{ opacity: 0, x: 100, y: 0 }}
					visible={{ opacity: 100, x: 0, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<h2 className={`uppercase text-5xl max-[380px]:text-4xl  text-white drop-shadow-2xl ${gaegu.className}`}>
						Curls n’ stuff
					</h2>
				</Reveal>
			</div>
		</section>

	)
}

export default Hero