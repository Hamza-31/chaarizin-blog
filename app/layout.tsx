


import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomThemeProvider from '@/lib/CustomThemeProvider'
import CustomSessionProvider from '@/lib/CustomSessionProvider'
import { Alegreya } from 'next/font/google'
import GoogleAnalytics from '@/lib/googleAnalytics'
const alegreya = Alegreya({ subsets: ['latin'], weight: ['400', '600'] })

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_CHAARIZIN_URL as string),
	title: {
		default: 'Charizin Blog',
		template: '%s | Charizin Blog'
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
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
			<GoogleAnalytics />
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
