import Hero from "@/components/home/Hero";
import Articles from "@/components/home/Articles";
import MotionWrapper from "@/components/motions/MotionWrapper";
import dynamic from 'next/dynamic'

const CurlClub = dynamic(() => import('../components/home/CurlClub'), {
	ssr: false,
	loading: () => <p>Loading...</p>
})
const Aside = dynamic(() => import('../components/home/Aside'), {
	ssr: false,
	loading: () => <p>Loading...</p>
})



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
