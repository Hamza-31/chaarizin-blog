import { NextResponse } from 'next/server'
import sendgrid from "@sendgrid/mail";
import emailTemplate from '@/lib/emailTemplate';
import axios, { setCsrfToken } from '@/lib/axios';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);
import fs from "fs";
import ebookEmailTemplate from '@/lib/ebookEmailTemplate';

const pathToAttachment = `https://drive.google.com/file/d/1ZfsOMGwBCk1tBwfsqBUP1n5WFt56ED-4/view`;
const attachment = fs.readFileSync(pathToAttachment).toString("base64");

export async function POST(request: Request) {
	const data = await request.json()
	const { email } = data
	const message = "Your Free Ebook"
	console.log(pathToAttachment)
	try {
		setCsrfToken()
		const res = await axios.post("/api/newsletter-contacts", { data: { email } }) as any

	} catch (error: any) {
		console.log("NewsLetter Error Server", error?.error)
	}
	try {
		const response = await sendgrid.send({
			to: email as string,
			from: process.env.SENDGRID_EMAIL_FROM as string,
			subject: `Free Ebook - Chaarizin`,
			html: ebookEmailTemplate(),
			attachments: [
				{
					content: attachment,
					filename: "chaarizin_ebook.pdf",
					type: "application/pdf",
					disposition: "attachment"
				}
			]
		});
		return NextResponse.json({ message: "Your Ebook has been succesfully sent. Please Check your email address." })
	} catch (error: any) {
		console.log("Ebook Email Error", error)
		return NextResponse.json({ error: "Something wrong happened!" })

	}
}