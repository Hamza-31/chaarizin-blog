import axios, { setAccessToken, setCsrfToken } from '@/lib/axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.json()
	const { author, article, content, accessToken } = data
	try {
		setCsrfToken()
		setAccessToken(accessToken)
		const res = await axios.post("/api/comments", {
			data: {
				author, article, content
			}
		})
		if (res.data) return NextResponse.json({ message: "Your comment has been successfully sent !" })
		if (!res) return NextResponse.json({ error: "Something wrong happened." })

	} catch (error) {
		console.log("AddComment Error Server", error)
		return NextResponse.json({ error: "Something wrong happened." })

	}
	return NextResponse.json({ error: "Something wrong happened." })


}