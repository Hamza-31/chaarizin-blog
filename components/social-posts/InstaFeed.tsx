import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import qs from '@/lib/queryString';
import axios from 'axios';

interface InstagramPost {
	id: number;
	permalink: string;
	media_type: string;
	media_url: string;
	caption: string;
}
interface InstaPostsProps {
	instagramPosts: InstagramPost[];
}
const getData = async () => {
	try {

		const instagramResponse = await axios.get(`https://graph.instagram.com/me/media?limit=7&fields=id,media_url,media_type,caption,permalink&access_token=${process.env.INSTA_CLIENT}`)
		const instaPosts = instagramResponse.data.data
			.filter((p: InstagramPost) => p.media_type == "IMAGE" || p.media_type == "CAROUSEL_ALBUM")
			.slice(0, 4);
		return instaPosts
	} catch (error) {
		console.log("Error Fetching Instagram Posts", error)
		return []
	}
}


const InstaFeed = async () => {
	const posts = await getData()
	return (
		<section className="max-[500px]:bg-dark-purple pb-3">
			<h3 className="my-7 text-3xl max-[500px]:text-beige px-2 pt-2 min-[960px]:px-16">
				Us on Instagram
			</h3>
			<div className="block px-2 min-[960px]:px-16">
				<ul
					id="post-link"
					className="grid grid-cols-4 pb-2 max-[960px]:grid-cols-3 gap-3 "
				>
					{posts.length !== 0 && posts.map((post: InstagramPost) => (
						<li
							key={post.id}
							className="max-[960px]:last:hidden bg-dark-purple mx-auto overflow-hidden  border-[1px] border-dark-purple"
						>
							<Link
								target="_blank"
								className="block hover:scale-110 hover:opacity-90 ease-in-out duration-300 mx-auto "
								href={post.permalink}
							>
								<Image
									src={post.media_url}
									alt={post.caption.substring(0, 120)}
									width={200}
									height={200}
								/>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default InstaFeed