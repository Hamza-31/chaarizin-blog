import axios, { setCsrfToken } from '@/lib/axios'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.json()
	const { email } = data
	try {
		setCsrfToken()
		const res = await axios.post("/api/auth/forgot-password", {
			email: email,
		})
		if (!res) return NextResponse.json({
			error: "Something wrong happened.",
			message: ""
		})
		if (res.data.ok) return NextResponse.json({ error: "", message: "Please Check your email address to reset password." })

	} catch (error) {
		console.log("ForgotPassword Error Server", error)
		return NextResponse.json({
			error: "Something wrong happened.",
			message: ""
		})

	}
	return NextResponse.json({
		error: "Something wrong happened.",
		message: ""
	})

}