import NewsLetter from "@/components/NewsLetter";
import SocialLinks from "@/components/SocialLinks";
import InstaFeed from "@/components/social-posts/InstaFeed";
import LatestPosts from "@/components/articles/LatestArticles";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import Reveal from "@/components/motions/Reveal";
import Hero from "@/components/home/Hero";
import Articles from "@/components/home/Articles";
import CurlClub from "@/components/home/CurlClub";
import Aside from "@/components/home/Aside";
import MotionWrapper from "@/components/motions/MotionWrapper";



export default function Home() {
	return (
		<MotionWrapper>
			<Hero />
			<Articles />
			<CurlClub />
			<Aside />
		</MotionWrapper>
	)
}
