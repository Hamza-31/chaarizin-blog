


import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomThemeProvider from '@/lib/CustomThemeProvider'
import CustomSessionProvider from '@/lib/CustomSessionProvider'
import { Alegreya } from 'next/font/google'
import Script from 'next/script'
const alegreya = Alegreya({ subsets: ['latin'], weight: '400' })

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_CHAARIZIN_URL as string),
	title: {
		default: 'Charizin Blog',
		template: '%s | Charizin Blog'
	},
	description: 'Curly Hair Blogger',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (

		<html lang="en" suppressHydrationWarning={true}>
			<Script id="google_analytics" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></Script>
			<Script id='google_analytics_script' dangerouslySetInnerHTML={{
				__html: typeof window !== 'undefined' && `
	window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
	`
			}}></Script>
			<body className={`dark:text-beige dark:bg-dark-purple text-dark-purple tracking-wider ${alegreya.className}`} >
				<CustomThemeProvider >
					<CustomSessionProvider>
						<div id="modal"></div>
						<Navbar />

						{children}

						<Footer />
					</CustomSessionProvider>
				</CustomThemeProvider>
			</body>
		</html>
	)
}
