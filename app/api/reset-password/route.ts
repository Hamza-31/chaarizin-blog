import axios, { setCsrfToken } from '@/lib/axios'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.json()
	const { password, code, passwordConfirmation } = data
	try {
		setCsrfToken()
		const res = await axios.post("/api/auth/reset-password", {
			password: password,
			passwordConfirmation: passwordConfirmation,
			code: code
		}) as { data: {}, error: {} }
		if (res?.data) return NextResponse.json({ error: "", message: "Your password has been successfully resetted. In a few second you'll be redirected to login page." })
		if (res?.error) return NextResponse.json({ error: "Something wrong happened.", message: "" })

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