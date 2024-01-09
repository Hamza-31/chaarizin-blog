import { NextResponse } from 'next/server'
// import sendgrid from "@sendgrid/mail";
// import emailTemplate from '@/lib/emailTemplate';
import { Resend } from 'resend';
import { ResendEmailTemplate } from '@/lib/ResendEmailTemplate';
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	const data = await request.json()
	const { email, message, username } = data
	try {
		const { data, error } = await resend.emails.send({
			from: `Chaarizin <${process.env.RESEND_EMAIL_FROM as string}>`,
			to: process.env.RESEND_EMAIL_TO as string,
			subject: `Contact Chaarizin ${username}`,
			react: ResendEmailTemplate({ email: email }),
		});
		if (error) {
			return NextResponse.json({ error: error }, { status: 400 })
		}
		return NextResponse.json({ message: "Your message has been succesfully sent." })
	} catch (error: any) {
		console.log("Sendgrid Email Error", error)
		return NextResponse.json({ error: "Something wrong happened!" })

	}
}