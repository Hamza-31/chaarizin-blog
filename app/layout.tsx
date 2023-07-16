


import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomThemeProvider from '@/lib/CustomThemeProvider'
import CustomSessionProvider from '@/lib/CustomSessionProvider'
import { Alegreya } from 'next/font/google'

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
