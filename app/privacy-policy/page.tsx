import axios from "@/lib/axios";
import Markdown from "markdown-to-jsx";
import React from "react";

const getData = async () => {
	try {
		const res = await axios.get("/api/privacy-policy")
		const { content } = res?.data?.data?.attributes
		if (content) {
			return {
				content: content,

			}
		}
		if (!content) {
			return {
				content: "",
			}
		}
	} catch (error) {
		console.log("Privacy Policy Error : ", error)
		return {
			content: "",
		}
	}

}

const PrivacyPolicy = async () => {
	const { content } = await getData() as { content: string }
	return (
		<section
			className={`
	  mx-auto 
	  py-7 
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
			<h1 className="pt-10">Privacy Policy</h1>
			<Markdown>{content}</Markdown>
		</section>
	);
};

export default PrivacyPolicy;