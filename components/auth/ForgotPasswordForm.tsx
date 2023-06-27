'use client'
import { Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Loader from '../Loader';
import CustomInput from '../forms/CustomInput';
import { forgotPasswordSchema } from '@/lib/FormikSchema';
import axiosClient from '@/lib/clientAxios';
import Link from 'next/link';
import WarningAlert from '../WarningAlert';

const ForgotPasswordForm = () => {
	const session = useSession()
	const [forgotPasswordResponse, setForgotPasswordResponse] = useState({
		error: "",
		message: ""
	})
	const handleForgotPassword = async ({ email }: { email: string }) => {
		if (!email) return
		try {
			const res = await axiosClient.post("/api/forgot-password", { email: email })
			setForgotPasswordResponse(res.data)
		} catch (error) {
			console.log("Forgot Password Error client : ", error)
			setForgotPasswordResponse({ message: "", error: "Network might be slow, please try again." })
		}
	}
	return (
		<section className="h-screen flex justify-center items-start">

			{forgotPasswordResponse.message && (
				<div className="bg-beige text-dark-purple min-[426px]:w-[400px] w-full mx-2 mx-auto py-7 px-4 rounded-lg mt-9">
					<p className="text-center">{forgotPasswordResponse.message} <Link className='text-neo-purple underline' href="/">Home</Link></p>
				</div>
			)}
			{!forgotPasswordResponse.message && (
				<Formik
					initialValues={{ email: "" }}
					validationSchema={forgotPasswordSchema}
					onSubmit={(values, { setSubmitting }) => {
						handleForgotPassword(values)
						setTimeout(() => {
							setSubmitting(false)
						}, 3000)
					}}
				>
					{({ handleSubmit, isSubmitting }) => (
						<form
							onSubmit={handleSubmit}
							className="bg-dark-purple text-white min-[426px]:w-[400px] w-full mx-2 mx-auto py-7 px-4 rounded-lg mt-9"
						>
							<h1 className="text-xl text-center mb-4">Password Reset</h1>


							<CustomInput
								bg='bg-white'
								label="Your email"
								htmlFor="email"
								type="email"
								placeholder="your@email.com"
								name="email"
								id="forgot-password-email"
							/>
							<button
								id="forgot-password-submit"
								className="mt-3 py-2 rounded-md hover:opacity-90 w-2/4 mx-auto block bg-beige text-dark-purple"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? <Loader size='h-5 w-5' /> : "Send"}
							</button>
							{forgotPasswordResponse.error && (
								<WarningAlert error={forgotPasswordResponse.error} />
							)}
						</form>
					)}
				</Formik>
			)}
		</section>
	)
}

export default ForgotPasswordForm