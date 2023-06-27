'use client'
import React, { useEffect, useState } from 'react'
import CustomInput from '../forms/CustomInput';
import Loader from '../Loader';
import { Formik } from 'formik';
import { resetPasswordSchema } from '@/lib/FormikSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosClient from '@/lib/clientAxios';
import WarningAlert from '../WarningAlert';

const ResetPasswordForm = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const [resetPasswordResponse, setResetPasswordResponse] = useState({
		error: "",
		message: ""
	})
	const token = searchParams.get('code')

	useEffect(() => {
		if (resetPasswordResponse.message) {
			setTimeout(() => {
				router.push('/auth/login')
			}, 3000)
		}
	})

	const handleResetPassword = async ({ password, passwordConfirmation }: { password: string, passwordConfirmation: string }) => {
		if (!password || !passwordConfirmation) return
		if (!token) {
			setResetPasswordResponse({ error: "Token not found!", message: "" })
			return
		}
		try {
			const res = await axiosClient.post("/api/reset-password", {
				password: password,
				passwordConfirmation: passwordConfirmation,
				code: token
			})
			setResetPasswordResponse(res.data)
		} catch (error) {
			console.log("Reset Password Error client :", error)
			setResetPasswordResponse({ error: "Network might be slow, please try again.", message: "" })
		}
	}
	return (
		<section className="h-screen flex justify-center items-start">
			{resetPasswordResponse.message && (
				<div className="bg-beige text-center space-y-2 min-[426px]:w-[400px] w-full mx-2 mx-auto py-7 px-4 rounded-lg mt-9">
					<p>{resetPasswordResponse.message}</p>
					<Loader size='h-5 w-5' />
				</div>
			)}
			{!resetPasswordResponse.message && (
				<Formik
					initialValues={{ password: "", passwordConfirmation: "" }}
					validationSchema={resetPasswordSchema}
					onSubmit={(values, { setSubmitting }) => {
						handleResetPassword(values);
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
							<h1 className="text-xl text-center mb-4">Reset Password</h1>

							<CustomInput
								bg="bg-white"
								label="Password"
								htmlFor="password"
								type="password"
								placeholder="••••••••"
								name="password"
								id="password"
							/>
							<CustomInput
								bg="bg-white"
								label="Confirm password"
								htmlFor="confirm-password"
								type="password"
								placeholder="••••••••"
								name="passwordConfirmation"
								id="passwordConfirmation"
							/>

							<button
								className="mt-3 py-2 rounded-md hover:opacity-90 w-2/4 mx-auto block text-dark-purple bg-beige"
								type="submit"
								disabled={isSubmitting}
							>
								{" "}
								{isSubmitting ? <Loader size='h-5 h-5' /> : "Send"}
							</button>
							{resetPasswordResponse.error && (
								<WarningAlert error={resetPasswordResponse.error} />

							)}
						</form>
					)}
				</Formik>
			)}
		</section>
	)
}

export default ResetPasswordForm