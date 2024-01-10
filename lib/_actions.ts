import { Resend } from 'resend';
import { ResendEmailTemplate } from './ResendEmailTemplate';


const resend = new Resend(process.env.RESEND_API_KEY);
interface EmailData {
	email: string,
	message: string,
	username: string
}
export async function sendEmail(userData: EmailData) {
	const { email, message, username } = userData
	try {

		const { data, error } = await resend.emails.send({
			from: `Chaarizin <${process.env.RESEND_EMAIL_FROM as string}>`,
			to: process.env.RESEND_EMAIL_TO as string,
			subject: `Contact Chaarizin ${username}`,
			react: ResendEmailTemplate({ email: email }),
		});
		if (error) {
			return { success: false, error }
		}
		return { success: true, data }
	} catch (error) {
		return { success: false, error }
	}

}