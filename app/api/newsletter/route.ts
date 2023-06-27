import axios, { setCsrfToken } from '@/lib/axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.json()
	const { email } = data
	try {
		// setAccessToken(accessToken)
		setCsrfToken()
		const res = await axios.post("/api/newsletter-contacts", { data: { email } }) as any
		if (res.data) return NextResponse.json({ message: "You have been successfully subscribed !" })

		if (res?.error.message.includes('must be unique')) {
			return NextResponse.json({ error: "You are already subscribed!" })
		}
		return NextResponse.json({ error: "Something wrong happened!" })

	} catch (error: any) {
		console.log("NewsLetter Error Server", error?.error)

		return NextResponse.json({ error: "Something wrong happened!" })

	}
}