'use client'
import React from "react";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
const Footer = () => {
	return (
		<footer className="bg-dark-purple max-[1024px]:bg-white max-[1024px]:dark:bg-dark-purple min-h-[45px] pt-3 ">
			<nav className="mx-auto max-w-7xl max-w-screen-lg hidden lg:grid grid-cols-3  text-beige ">
				<ul className="grid grid-cols-3 underline">
					<li className="w-full text-center">
						<Link href="/blog">Blog</Link>
					</li>
					<li className="w-full text-center">
						<Link href="/journal">Journal</Link>
					</li>
					<li className="w-full text-center">
						<Link href="/about">About</Link>
					</li>
				</ul>
				<h6
					className={`text-2xl bold text-center leading-3 font-playfairDisplay`}
				>
					<Link href="/">Chaarizin</Link>
				</h6>
				<ul className="grid grid-cols-3 relative ">
					<li className="w-full text-center underline">
						<Link href="/contact">Contact</Link>
					</li>
					<li className="w-full text-center underline">
						<Link href="/privacy-policy">Privacy Policy</Link>
					</li>
					<li>
						<SocialLinks grid="flex justify-center" color="fill-neo-purple" />
					</li>
				</ul>
			</nav>
			{/* Mobile Navigation */}
			<nav className=" w-2/5 mx-auto max-[1024px]:block hidden mt-16 mb-7">
				<ul className="text-center">
					<li className="border-b-[1px] py-2">
						<Link href="/about">About</Link>
					</li>
					<li className="border-b-[1px] py-2">
						<Link href="/blog">Blog</Link>
					</li>
					<li className="border-b-[1px] py-2">
						<Link href="/journal">Journal</Link>
					</li>
					<li className="border-b-[1px] py-2">
						<Link href="/contact">Contact</Link>
					</li>
					<li className="py-2">
						<Link href="/privacy-policy">Privacy Policy</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
