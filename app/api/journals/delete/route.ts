import axios, { setAccessToken, setCsrfToken } from '@/lib/axios'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.json()
	const { id, accessToken } = data
	try {
		setCsrfToken()
		setAccessToken(accessToken)
		const res = await axios.delete(`/api/journals/${id}`)
		if (res.data) return NextResponse.json({
			error: "",
			message: "Your journal has been successfully deleted !",
		})
		if (!res.data) return NextResponse.json({
			error: "Something wrong happened.",
			message: "",
		})

	} catch (error) {
		console.log("Deleting Error Server", error)
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