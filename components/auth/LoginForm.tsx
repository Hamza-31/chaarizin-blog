"use client"
import { loginSchema } from '@/lib/FormikSchema'
import { Formik } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CustomInput from '../forms/CustomInput'
import Link from 'next/link'
import Loader from '../Loader'
import WarningAlert from '../WarningAlert'

const LoginForm = () => {
	const session = useSession()
	const path = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()
	const [resError, setResError] = useState("")

	const handleLogin = async ({ email, password }: { email: string, password: string }) => {
		if (!email || !password) return
		try {
			const res = await signIn("login", {
				email: email,
				password: password,
				redirect: false,
			})
			if (res?.error) {
				setResError("Something went wrong, please try again.")
				return
			}
			router.push(searchParams?.get("callbackUrl") || "/")
		} catch (error) {
			console.log("Login Error client : ", error)
			setResError("Network might be slow, please try again.")
		}

	}
	useEffect(() => {
		if (session.status === "authenticated") {
			router.push("/")
		}
	})

	if (session.status === "unauthenticated") {
		return (<section className="min-h-screen">
			<h1 className="text-xl font-bold leading-tight tracking-tight text-center py-12">
				Login in to your account
			</h1>

			<br />
			{/* <button onClick={() => signIn("facebook")}>
                  Login with Facebook
                </button> */}
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={(values, { setSubmitting }) => {
					handleLogin(values)
					setTimeout(() => {

						setSubmitting(false)
					}, 3000)
				}}
				validationSchema={loginSchema}
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
						className="space-y-4 md:space-y-6 min-[400px]:w-[350px] mx-auto bg-dark-purple text-white px-4 py-6 rounded"
					>

						<CustomInput
							bg=""
							label="Your email"
							htmlFor="email"
							type="email"
							placeholder="your@email.com"
							name="email"
							id="email"
						/>
						<CustomInput
							bg=""
							label="Password"
							htmlFor="password"
							type="password"
							placeholder="••••••••"
							name="password"
							id="password"
						/>

						<div className="flex items-center justify-end">
							<Link
								id="forgot-password"
								href="/auth/forgot-password"
								className="text-sm font-medium underline"
							>
								Forgot password?
							</Link>
						</div>

						<button
							id="login-submit"
							type="submit"
							className="block mx-auto w-[100px] hover:opacity-90 text-dark-purple bg-beige hover:font-bold font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>
							{isSubmitting ? <Loader size='h-5 w-5' /> : "Login"}
						</button>
						{resError && (
							<WarningAlert error={resError} />
						)}
						<p className="text-sm text-center font-light">
							Don’t have an account yet?{" "}
							<Link
								href="/auth/register"
								className="font-medium text-neo-purple underline"
							>
								Register
							</Link>
						</p>
					</form>
				)}
			</Formik>
		</section>)
	}
	return (
		<div className="h-screen flex justify-center items-center">
			<Loader size='w-5 h-5' />
		</div>
	)
}

export default LoginForm