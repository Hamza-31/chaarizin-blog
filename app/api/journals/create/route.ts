import axios, { setAccessToken, setCsrfToken } from '@/lib/axios'
import slugify from '@/lib/slugify'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.json()
	const { author, title, content, accessToken } = data
	try {
		setCsrfToken()
		setAccessToken(accessToken)
		const res = await axios.post("/api/journals", {
			data: {
				author: author,
				title: title,
				content: content,
				slug: slugify(title)
			}
		}) as any
		if (res.data) return NextResponse.json({
			error: "",
			message: "Your journal has been successfully created !",
			data: {
				title: res.data.data.attributes.title,
				slug: res.data.data.attributes.slug
			}
		})
		if (res.error.message.includes("must be unique")) {
			return NextResponse.json({
				error: "The title of your journal is already in use. Please use another.",
				message: "",
				data: {
					slug: "",
					title: ""
				}
			})
		}
		if (!res.data) return NextResponse.json({
			error: "Something wrong happened.",
			message: "",
			data: {
				slug: "",
				title: ""
			},
		})

	} catch (error) {
		console.log("AddJournal Error Server", error)
		return NextResponse.json({
			error: "Something wrong happened.",
			message: "",
			data: {
				slug: "",
				title: ""
			},
		})

	}
	return NextResponse.json({
		error: "Something wrong happened.",
		message: "",
		data: {
			slug: "",
			title: ""
		},
	})


}