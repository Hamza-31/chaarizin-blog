import { NextResponse } from 'next/server'
import sendgrid from "@sendgrid/mail";
import emailTemplate from '@/lib/emailTemplate';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
	const data = await request.json()
	const { email, message, username } = data
	try {
		const response = await sendgrid.send({
			to: email, // change it to admin process.env.SENDGRID_EMAIL_TO
			from: process.env.SENDGRID_EMAIL_FROM as string,
			subject: `Contact Chaarizin ${username}`,
			html: emailTemplate({ email, message }),
		});
		return NextResponse.json({ message: "Your message has been succesfully sent." })
	} catch (error: any) {
		console.log("Sendgrid Email Error", error)
		return NextResponse.json({ error: "Something wrong happened!" })

	}
}