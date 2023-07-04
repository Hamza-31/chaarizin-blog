'use client'

import { contactSchema } from '@/lib/FormikSchema';
import { Formik } from 'formik';
import React, { useState } from 'react'
import CustomInput from './CustomInput';
import Loader from '../Loader';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import axiosClient from '@/lib/clientAxios';
import WarningAlert from '../WarningAlert';

const ContactForm = () => {
	const [contactResponse, setContactResponse] = useState({
		message: "",
		error: ""
	});
	const handleSendContactEmail = async (values: { email: string, username: string, message: string }) => {
		try {
			const res = await axiosClient.post("/api/sendgrid", {
				email: values.email,
				username: values.username,
				message: values.message
			})
			setContactResponse(res.data);
		} catch (error) {
			console.log("Error sending email from client : ", error)
			setContactResponse({ error: "Network might be slow, please try again.", message: "" })
		}
	}
	return (
		<>
			{contactResponse.message && (
				<div className="bg-beige text-dark-purple px-5 py-5 rounded-lg flex justify-center items-center">
					<p>Your message has been successfully sent !</p>
				</div>
			)}
			{contactResponse.error && (
				<WarningAlert error={contactResponse.error} />

			)}
			{!contactResponse.message && (
				<Formik
					initialValues={{ username: "", email: "", message: "" }}
					validationSchema={contactSchema}
					onSubmit={async (values, { setSubmitting }) => {
						handleSendContactEmail(values)
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<form
							onSubmit={handleSubmit}
							className="bg-beige text-dark-purple px-5 pb-5 pt-3 rounded-lg space-y-3 "
						>
							<div className='grid grid-cols-2 max-[450px]:grid-cols-1 gap-2'>

								<CustomInput
									bg="bg-white"
									label="Username"
									htmlFor="username"
									type="text"
									placeholder="Curleen"
									name="username"
									id="username"
								/>
								<CustomInput
									bg="bg-white"
									label="Your email"
									htmlFor="email"
									type="email"
									placeholder="email@example.com"
									name="email"
									id="email"
								/>
							</div>
							<div className="relative mb-6">
								<label
									htmlFor="message"
									className="block mb-2 text-sm font-medium"
								>
									Your message{" "}

								</label>

								<textarea
									id="message"
									placeholder="Message"
									value={values.message}
									onBlur={handleBlur}
									onChange={handleChange}
									name="message"
									className="border border-neo-purple-light text-dark-purple outline-none bg-white sm:text-sm rounded-lg block w-full p-2.5 h-44 resize-none"
									required
								/>

								<button
									className="absolute right-3 bottom-2"
									type="submit"
								>
									{isSubmitting ? (
										<Loader size="w-[20px] h-[20px]" />
									) : (
										<ArrowLongRightIcon width={24} color="#DB5F5F" />
									)}
								</button>
							</div>
							<span className="text-red">
								{errors.message && touched.message && errors.message}
							</span>
						</form>
					)}
				</Formik>
			)}
		</>
	)
}

export default ContactForm