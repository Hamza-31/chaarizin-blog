import { NextResponse } from 'next/server'
// import sendgrid from "@sendgrid/mail";
// import emailTemplate from '@/lib/emailTemplate';
import { Resend } from 'resend';
import { ResendEmailTemplate } from '@/lib/ResendEmailTemplate';
import { sendEmail } from '@/lib/_actions';
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY);

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