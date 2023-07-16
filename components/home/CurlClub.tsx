import Link from 'next/link'
import React, { use } from 'react'
import Reveal from '../motions/Reveal'
import axios from '@/lib/axios'
import Markdown from 'markdown-to-jsx'

const getData = async () => {
	try {
		const res = await axios.get("/api/curl-club")
		const { content } = res?.data?.data?.attributes
		if (content) {
			return {
				content: content,

			} as any
		}
		if (!content) {
			return {
				content: "",
			}
		}
	} catch (error) {
		console.log("Curl Club Error : ", error)
		return {
			content: "",
		}
	}

}

const CurlClub = () => {
	const { content } = use(getData())
	return (

		<section className="w-full bg-beige dark:bg-gradient-to-r dark:from-[#b2aa9d] dark:via-[#aba291] dark:to-[#90846c] min-h-screen flex flex-col items-center justify-center">
			<article className="lg:w-2/4 w-3/4 max-[500px]:w-full max-[500px]:px-4 mx-auto text-center dark:text-dark-purple">
				<h4 className="text-5xl max-[750px]:pt-11 uppercase lg:w-3/4  mx-auto">Curl Club</h4>
				<svg
					className="mx-auto mt-2"
					width="197"
					height="21"
					viewBox="0 0 197 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M195.588 11.75C185.179 14.4266 176.43 11.6706 167.031 8.27566C160.625 5.96191 158.867 13.2844 154.38 17.2256C149.673 21.3598 143.8 20.2848 139.394 17.4215C137.447 16.156 126.859 4.08323 125.276 5.32515C121.951 7.93338 119.33 12.8733 116.768 16.2575C113.639 20.3917 108.198 13.3135 106.095 11.4481C101.31 7.20309 96.3061 -1.10667 89.36 4.80719C84.6678 8.80205 75.3564 20.8754 68.7214 20.0827C62.6429 19.3565 57.7131 11.2404 54.6893 6.64179C51.3605 1.57932 50.718 -1.74659 45.0331 2.79464C43.4625 4.04925 38.6249 8.71412 36.4413 7.38113C34.3894 6.12854 35.4344 1.87456 33.1069 0.947225C30.1968 -0.212181 23.4928 10.8764 22.1142 12.6265C18.1912 17.6068 16.6222 19.2749 11.9134 15.8028C10.0252 14.4105 2.97083 6.09258 0.999992 8.69649"
						stroke="#DB5F5F"
						strokeLinecap="round"
					/>
				</svg>
				<div
					className={`
					mx-auto text-center
					pt-12
					prose prose-p:dark:text-dark-purple prose-p:pt-4
`}
				>
					<Markdown>{content}</Markdown>
				</div>
				<div className="my-7 min-[524px]:grid min-[524px]:grid-cols-2 mx-auto w-2/4 max-[800px]:w-3/4 max-[524px]:w-2/5 max-[524px]:mx-auto grid-cols-1 block gap-2">
					<Link
						href="/journal/create"
						className="block lg:mb-0 max-[524px]:mb-2 px-1 bg-dark-purple text-beige border-2 border-dark-purple"
					>
						Drop yours
					</Link>
					<Link
						href="/journal"
						className="block px-1 bg-beige text-dark-purple border-2 border-dark-purple"
					>
						Read Journal
					</Link>
				</div>
			</article>
		</section>

	)
}

export default CurlClub