import React from 'react'
import Script from 'next/script'

const GoogleAnalytics = () => {
	return (
		<>
			{/* <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}`}></Script>
			<Script id='google_analytics'>
				{
					typeof window !== 'undefined' && `
					window.dataLayer = window.dataLayer || [];
				  function gtag(){dataLayer.push(arguments);}
				  gtag('js', new Date());
				
				  gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string});
					`
				}
			</Script> */}
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}`}
			/>
			<Script
				id="gtag-init"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
			window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}');
			`
				}}

			/>
		</>
	)
}

export default GoogleAnalytics