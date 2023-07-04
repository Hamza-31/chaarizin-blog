'use client'
import { Formik } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CustomInput from '../forms/CustomInput'
import Link from 'next/link'
import Loader from '../Loader'
import { registerSchema } from '@/lib/FormikSchema'
import WarningAlert from '../WarningAlert'

const RegisterForm = () => {
	const path = usePathname()
	const router = useRouter()
	const session = useSession()
	const searchParams = useSearchParams()
	const [resError, setResError] = useState("")
	const handleRegister = async ({ username, email, password, terms, newsletter }: { username: string, email: string, password: string, terms: boolean, newsletter: boolean }) => {
		if (!email || !password || !terms || !username) return
		try {


			const res = await signIn("register", {
				username: username,
				email: email,
				password: password,
				newsletter: newsletter,
				redirect: false,
			})
			if (res?.error) {
				setResError("Something went wrong, please try again.")
				return
			}
			router.push(searchParams?.get("callbackUrl") || "/")
		} catch (error) {
			console.log("Registration Error client : ", error)
			setResError("Network might be slow, please try again.")
		}
	}
	useEffect(() => {
		if (session.status === "authenticated") {
			router.push("/")
		}
	})
	if (session.status === "unauthenticated") {
		return (
			<section className="min-h-screen">
				<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center py-12">
					Create an account
				</h1>
				<Formik
					initialValues={{
						username: "",
						email: "",
						password: "",
						confirmPassword: "",
						newsletter: false,
						terms: false,
					}}
					onSubmit={(values, { setSubmitting }) => {
						handleRegister(values)
						setTimeout(() => {

							setSubmitting(false)
						}, 3000)
					}}
					validationSchema={registerSchema}
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
							className="space-y-4 md:space-y-6 w-full min-[620px]:w-[600px] mx-auto bg-dark-purple text-white px-3 py-6 rounded"
							action="#"
							onSubmit={handleSubmit}
						>

							<div className="grid min-[470px]:grid-cols-2 grid-cols-1 gap-3">
								<CustomInput
									bg=""
									label="What should we call you ?"
									htmlFor="username"
									type="text"
									placeholder="e.g. Curleen"
									name="username"
									id="username"
								/>
								<CustomInput
									bg=""
									label="Your email"
									htmlFor="email"
									type="email"
									placeholder="your@email.com"
									name="email"
									id="email"
								/>
							</div>
							<div className="grid min-[470px]:grid-cols-2 grid-cols-1 gap-3">
								<CustomInput
									bg=""
									label="Password"
									htmlFor="password"
									type="password"
									placeholder="••••••••"
									name="password"
									id="password"
								/>
								<CustomInput
									bg=""
									label="Confirm password"
									htmlFor="confirm-password"
									type="password"
									placeholder="••••••••"
									name="confirmPassword"
									id="confirmPassword"
								/>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.terms as any}
										id="terms"
										name="terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded accent-dark-purple"
										required
									/>
								</div>
								<div className="ml-3 text-sm">
									<label htmlFor="terms" className="font-light">
										By signing up, you are creating a Chaarizin account,
										and you agree to Chaarizin’s{" "}
										<Link
											className="font-medium underline"
											href="/privacy-policy"
										>
											Privacy Policy
										</Link>
										.
									</label>
									<span className="text-red block mt-2">
										{errors.terms && touched.terms && errors.terms}
									</span>
								</div>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.newsletter as any}
										id="newsletter"
										aria-describedby="newsletter"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-dark-purple"
									/>
								</div>
								<div className="ml-3 text-sm">
									<label htmlFor="newsletter" className="font-light">
										Subscribe to Chaarizin’s newsletter.
									</label>
								</div>
							</div>


							<button
								type="submit"
								className="block hover:opacity-90 max-[500px]:w-3/5 w-2/5 mx-auto text-dark-purple bg-beige focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								{isSubmitting ? <Loader size='h-5 w-5' /> : "Create an account"}
							</button>
							{resError && (
								<WarningAlert error={resError} />
							)}
							<p className="text-sm font-light">
								Already have an account?{" "}
								<button
									type="button"
									onClick={() => {
										// specify redirect page
										router.push(`/auth/login?callbackUrl=${path}`);
									}}
									className="font-medium text-neo-purple underline"
								>
									Login here
								</button>
							</p>
						</form>
					)}
				</Formik>
			</section>
		)
	}
	return (
		<div className="h-screen flex justify-center items-center">
			<Loader size='w-5 h-5' />
		</div>
	)
}

export default RegisterForm