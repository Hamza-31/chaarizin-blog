import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/_actions';

export async function POST(request: Request) {
	const data = await request.json()
	const { email, message, username } = data
	const result = await sendEmail({ email, message, username });

	if (result.success) {
		return NextResponse.json({ message: "Your message has been succesfully sent." })
	}
	if (!result.success) {
		return NextResponse.json({ error: result.error }, { status: 400 })
	}

	return NextResponse.json({ error: "Something wrong happened!" })

}