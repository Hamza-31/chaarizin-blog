'use client'
import React, { useState } from 'react'
import { Gaegu } from 'next/font/google'
import Image from 'next/image'
import ebook from '../../public/files/ebook.png'
import { Field, Form, Formik } from 'formik'
import { newsletterSchema } from '@/lib/FormikSchema'
import axiosClient from '@/lib/clientAxios'

const gaegu = Gaegu({ subsets: ['latin'], weight: '400' })

interface NewsletterResponse {
	message?: string;
	error?: string;
}

const Ebook = () => {
	const [newletterResponse, setnewletterResponse] = useState<NewsletterResponse>({});

	const handleSendEbook = async ({ email }: { email: string }) => {
		if (!email) return
		try {
			const res = await axiosClient.post("/api/ebook", {
				email: email
			})
			if (res.data) setnewletterResponse({ message: "Your Ebook has been succesfully sent. Please Check your email address.", error: "" });
			if (!res.data) setnewletterResponse({ message: "", error: "Something went wrong. Please try again." });
		} catch (error) {
			console.log("Error Adding contact newsletter", error)
			setnewletterResponse({ error: "Network might be slow, please try again.", message: "" })
		}
	}
	return (
		<section className="w-full min-h-screen  overflow-hidden bg-dark-purple text-beige relative">
			<svg
				className="opacity-60 max-[1024px]:text-center min-[1024px]:scale-250 min-[1024px]:top-[65px] min-[1024px]:left-24 scale-150 min-[600px]:top-[21px] -top-7 left-8 absolute "
				width="137"
				height="87"
				viewBox="0 0 137 87"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M136 1C130.209 7.22083 122.725 9.49935 114.459 11.6911C108.825 13.1848 111.438 18.2846 110.4 22.6089C109.31 27.1449 104.691 29.1311 100.151 29.4089C98.1447 29.5317 84.5198 27.1397 84.0756 28.5778C83.1429 31.5979 83.9149 35.6785 83.9149 38.8156C83.9149 42.6479 76.456 40.9036 74.0284 40.7422C68.5038 40.375 60.7037 37.7095 58.9976 44.2933C57.8451 48.7407 57.7254 60.0097 52.7281 62.5022C48.15 64.7857 40.5021 62.2014 36.0095 60.84C31.0637 59.3413 28.8812 57.6677 27.3286 62.88C26.8997 64.32 25.997 69.2271 23.792 69.4156C21.7199 69.5926 20.2178 66.6194 18.1253 67.1111C15.5092 67.7259 16.6756 77.2514 16.6383 78.8978C16.5323 83.5829 16.3205 85.2659 11.253 85.32C9.22096 85.3417 0 83.5862 0 86"
					stroke="#DB5F5F"
					strokeLinecap="round"
					className="svg-elem-1"
				></path>
			</svg>

			<div className="max-[1024px]:text-center max-[600px]:w-full max-[1024px]:w-4/5 min-[1024px]:grid min-[1024px]:grid-cols-7 py-24 mx-auto min-[1024px]:mx-40">
				<div className='mx-auto min-[1024px]:col-span-5 flex flex-col justify-center'>



					<p className="mb-12 text-2xl mx-3 min-[1024px]:w-4/5">
						A 30 pages e-book that covers the basics of curly hair, from the anatomy to the needs,the products to styling techniques, and many tips.
					</p>
					<div className='h-[378px] w-[243px] relative min-[1024px]:hidden mx-auto mb-11'>

						<Image src={ebook} alt=''
							className="object-cover object-center"
							fill
							sizes='100vw'
						/>
					</div>
					<h4 className={`max-[500px]:text-2xl mb-2 min-[1024px]:text-5xl mx-3 max-[1024px]:text-4xl max-[480px]:w-full uppercase min-[1024px]:mb-12 ${gaegu.className}`}>
						Iwa get your free copy!{" "}
					</h4>
					<Formik
						initialValues={{ email: "" }}
						onSubmit={async (values, { setSubmitting }) => {
							console.log(values)
							handleSendEbook(values)
							setTimeout(() => {
								setSubmitting(false)
							}, 3000)
						}}
						validationSchema={newsletterSchema}
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
							<>
								<Form
									className='mx-3'
								// onSubmit={e => e.preventDefault()}
								>
									{/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
									<label htmlFor="email" className="hidden">
										Email address
									</label>
									<Field
										placeholder="Your email"
										id="email"
										type="email"
										name='email'
										className="mx-auto p-2 border-2 border-beige bg-dark-purple w-[480px] max-[1024px]:w-full relative"
									/>
									<button
										disabled={isSubmitting}
										type="submit"
										className="text-red absolute mt-[8px] -translate-x-14 w-[50px] "
									>
										{" "}
										Get it
									</button>
								</Form>
								<span className="text-red">
									{errors.email && touched.email && errors.email}
								</span>
								{newletterResponse.error && (
									<div
										className="p-4 mb-4 text-sm text-red rounded-lg"
										role="alert"
									>
										{newletterResponse.error}
									</div>
								)}
								{newletterResponse.message && (
									<div className="p-4 mb-4 text-sm rounded-lg" role="alert">
										{newletterResponse.message}
									</div>
								)}
							</>
						)}
					</Formik>
				</div>
				<div className='min-[1024px]:col-span-2 max-[1024px]:hidden'>
					<div className='h-[504px] w-[324px] relative'>

						<Image src={ebook} alt=''
							className="object-cover object-center"
							fill
							sizes='100vw'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Ebook