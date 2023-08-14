import React from "react";
import Markdown from "markdown-to-jsx";
import BreadCrumb from "@/components/BreadCrumb";
import SocialLinks from "@/components/SocialLinks";
import axios from "@/lib/axios";

const getData = async () => {
	try {
		const res = await axios.get("/api/about")
		const { object, content } = res?.data?.data?.attributes
		if (object && content) {
			return {
				object: object,
				content: content,

			}
		}
		if (!object || !content) {
			return {
				object: "",
				content: "",
			}
		}
	} catch (error) {
		console.log("About Error : ", error)
		return {
			object: "",
			content: "",
		}
	}

}

const About = async () => {
	const { object, content } = await getData() as { object: string, content: string }
	return (
		<>
			<BreadCrumb postTitle="" page="About" />

			<section className=" relative  min-h-[200px] mx-auto  max-w-7xl max-w-screen-lg flex flex-col justify-center items-center bg-dark-purple min-[1024px]:mb-11">
				<div className="min-[1094px]:block hidden absolute top-0 -left-7">
					<SocialLinks grid="" color="" />
				</div>
				<div>
					<h2 className="uppercase text-center py-11 text-5xl max-[380px]:text-4xl  text-white dark:text-dark-purple drop-shadow-2xl">
						About
					</h2>
					<div
						className={`
					mx-3 
					pb-7 
					prose-li:marker:text-neo-purple prose-l:text-white 
					prose prose-p:text-white min-[900px]:prose-p:w-[560px] prose-p:break-normal
					prose-em:text-beige
					prose-strong:text-white prose-strong:text-dark-purple
					prose-headings:text-dark-purple prose-headings:text-beige
					prose-blockquote:text-dark-purple prose-blockquote:border-light-purple
					prose-a:text-neo-purple prose-a:text-light-purple prose-a:break-words
					prose-img:rounded-[100px] min-[600px]:prose-img:max-w-[393px] prose-img:mx-auto prose-img:block
`}
					>
						<Markdown>{content}</Markdown>
					</div>
				</div>
			</section>
		</>
	);
};

export default About;