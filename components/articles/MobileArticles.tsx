"use client"
import React, { FC, Fragment, useCallback, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { Transition } from "@headlessui/react";

interface Article {
	id: number;
	slug: string;
	postImage: string;
	title: string;
}
interface Image {
	id: number;
	src: string;
}

interface LatestArticlesProps {
	articles: Article[];
	images: Image[]
}
const MobileArticles: FC<LatestArticlesProps> = ({ articles, images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? articles.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = useCallback(() => {
		const isLastSlide = currentIndex === articles.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	}, [currentIndex, articles]);

	useEffect(() => {
		let slider = setInterval(() => {
			nextSlide();
		}, 3000);
		return () => clearInterval(slider);
	}, [nextSlide]);

	return (
		<>
			<div className="lg:hidden mx-auto relative h-[340px] px-4 flex justify-center ">
				{articles.map((article, index) => (
					<Transition
						key={index}
						show={index === currentIndex}
						as={Fragment}
						enter="transition ease-out duration-1000"
						enterFrom="opacity-0 translate-x-2"
						enterTo="opacity-100 translate-x-0"
						leave=""
						leaveFrom="opacity-100 translate-x-0"
						leaveTo="opacity-0 -translate-x-2"
					>
						<Link
							className={`${index === currentIndex ? "" : "hidden"}`}
							href={`/blog/${article.slug}`}
						>
							<article className="mb-3 min-h-[310px] w-[300px] max-[1024px]:pb-6 transition duration-500 ease-in-out">
								<div
									className="border-2 border-dark-purple dark:border-beige relative w-[300px] h-[200px]"
								>
									<Image
										className="object-cover object-center"
										fill
										src={images.find(img => img.id === article.id)?.src ?? ''}
										alt={article.title}
									/>
								</div>
								<h3 className="px-1 w-full mx-auto my-3 text-center  text-xl tracking-tight mb-2">
									{article.title}
								</h3>
							</article>
						</Link>
					</Transition>
				))}
				<div className="absolute z-10 flex space-x-3 -translate-x-1/2 bottom-10 left-1/2">
					{articles.map((_, index) => (
						<button
							onClick={() => setCurrentIndex(index)}
							key={index}
							type="button"
							className={`w-6 h-[1px] shadow-sm ${index === currentIndex
								? "bg-dark-purple dark:bg-neo-purple"
								: "border bg-neo-purple-light"
								}`}
							aria-current="false"
							aria-label={`Slide ${index}`}
							data-carousel-slide-to={index}
						></button>
					))}
				</div>
				<div className="absolute top-20 left-0 right-0 z-10 min-[480px]:w-[380px] mx-auto max-[359px]:hidden flex justify-between">
					<button
						onClick={prevSlide}
						type="button"
						className="flex items-center justify-center h-full  cursor-pointer group focus:outline-none"
						data-carousel-prev
					>
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 ">
							<svg
								aria-hidden="true"
								className="w-5 h-5 sm:w-6 sm:h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 19l-7-7 7-7"
								></path>
							</svg>
						</span>
					</button>
					<button
						onClick={nextSlide}
						type="button"
						className="flex items-center justify-center h-full cursor-pointer group focus:outline-none"
						data-carousel-next
					>
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10">
							<svg
								aria-hidden="true"
								className="w-5 h-5 sm:w-6 sm:h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 5l7 7-7 7"
								></path>
							</svg>
						</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default MobileArticles;
