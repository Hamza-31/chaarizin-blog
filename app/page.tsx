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

const Ebook = dynamic(() => import('../components/home/Ebook'), {
	ssr: false,
	loading: () => <p>Loading...</p>
})



export default function Home() {
	return (
		<MotionWrapper className='min-h-screen'>
			<Hero />
			<Articles />
			<CurlClub />
			<Ebook />
			<Aside />
		</MotionWrapper>
	)
}
