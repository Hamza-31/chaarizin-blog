import axios, { setAccessToken, setCsrfToken } from '@/lib/axios'
import slugify from '@/lib/slugify'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.json()
	const { id, title, content, accessToken } = data
	try {
		setCsrfToken()
		setAccessToken(accessToken)
		const res = await axios.put(`/api/journals/${id}`, {
			data: {
				title: title,
				content: content,
				slug: slugify(title)
			}
		}) as any
		if (res.data) return NextResponse.json({
			error: "",
			message: "Your journal has been successfully updated !",
		})
		if (res.error.message.includes("must be unique")) {
			return NextResponse.json({
				error: "The title of your journal is already in use. Please use another.",
				message: "",
			})
		}
		if (!res.data) return NextResponse.json({
			error: "Something wrong happened.",
			message: "",
		})

	} catch (error) {
		console.log("EditJournal Error Server", error)
		return NextResponse.json({
			error: "Something wrong happened.",
			message: "",
		})

	}
	return NextResponse.json({
		error: "Something wrong happened.",
		message: "",
	})


}