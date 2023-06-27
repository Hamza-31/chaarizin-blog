import React from "react";
import Markdown from "markdown-to-jsx";
import BreadCrumb from "@/components/BreadCrumb";
import SocialLinks from "@/components/SocialLinks";
import axios from "@/lib/axios";
import { error } from "console";
import Reveal from "@/components/motions/Reveal";

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

			<section className=" relative  min-h-[200px] mx-auto  max-w-7xl max-w-screen-lg mb-5 flex flex-col justify-center items-center bg-dark-purple">
				<div className="min-[1094px]:block hidden absolute top-0 -left-7">
					<SocialLinks grid="" color="" />
				</div>
				<div className=" flex justify-center  dark:bg-gradient-to-r dark:from-[#b2aa9d] dark:via-[#aba291] dark:to-[#90846c] items-center absolute top-0 bottom-0 right-0 left-0 inset-0">
					<h2 className="uppercase text-5xl max-[380px]:text-4xl  text-white dark:text-dark-purple drop-shadow-2xl">
						About
					</h2>
				</div>
			</section>

			<section className="min-h-screen mb-10">

				<h2 className="ml-7 my-10 max-[640px]:text-3xl max-[1024px]:ml-2 text-4xl py-7 text-red">
					{object}
				</h2>

				<div
					className={`
					mx-auto 
					pb-7 
					prose-li:marker:text-neo-purple prose-li:dark:text-white 
					prose prose-p:dark:text-white min-[900px]:prose-p:w-[560px]
					prose-em:dark:text-beige prose-em:text-dark-purple
					prose-strong:dark:text-white prose-strong:text-dark-purple
					prose-headings:text-dark-purple prose-headings:dark:text-beige
					prose-blockquote:text-dark-purple prose-blockquote:dark:border-light-purple
					prose-a:text-neo-purple prose-a:dark:text-light-purple
					prose-img:rounded-[100px] min-[600px]:prose-img:max-w-[393px] prose-img:mx-auto prose-img:block
`}
				>
					<Markdown>{content}</Markdown>
					<hr className="w-3/5 mx-auto bg-dark-purple" />
				</div>
			</section>
		</>
	);
};

export default About;