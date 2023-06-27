'use client'
import React, { useState } from 'react'
import Loader from '@/components/Loader';
import CustomInput from '@/components/forms/CustomInput';
import { addJournalSchema } from '@/lib/FormikSchema';
import { Formik } from 'formik';
import axiosClient from '@/lib/clientAxios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import WarningAlert from '../WarningAlert';
const AddJournalForm = () => {
	const path = usePathname()
	const [addJournalResponse, setAddJournalResponse] = useState({
		message: "",
		data: {
			slug: "",
			title: ""
		},
		error: ""
	})
	const session = useSession({
		required: true,
		onUnauthenticated() {
			redirect(`/auth/login?callbackUrl=${path}`)
		}
	}) as any
	const handleAddJournal = async ({ title, content }: { title: string, content: string }) => {
		if (!content || !title || !session) return
		try {
			const res = await axiosClient.post('/api/journals/create', {
				title: title,
				content: content,
				author: session.data.user?.id,
				accessToken: session?.data.accessToken
			})
			setAddJournalResponse(res.data)
		} catch (error) {
			console.log("Error Adding Journal Client", error)
			setAddJournalResponse({ error: "Network might be slow, please try again.", message: "", data: { slug: "", title: "" } })
		}

	}
	return (
		<>

			{session.status === "loading" && (
				<div className="h-screen flex justify-center items-center">
					<Loader size='w-5 h-5' />
				</div>
			)}

			{true && (
				<>
					{addJournalResponse.message && (
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<div
								className="p-4 mb-4 text-sm text-neo-purple rounded-lg flex justify-center items-center"
								role="alert"
							>
								<p className="ml-2 text-lg text-center">
									{addJournalResponse.message} <br />
									Check it in the link below.
								</p>
							</div>

							<Link
								className="block underline text-center"
								href={`/journal/${addJournalResponse.data.slug}`}
							>
								{addJournalResponse.data.title}
							</Link>
						</div>
					)}
					{(!addJournalResponse.data.title || !addJournalResponse.data.slug) && (
						<Formik
							initialValues={{
								title: "",
								content: "",
							}}
							validationSchema={addJournalSchema}
							onSubmit={(values, { setSubmitting }) => {
								handleAddJournal(values)
								setTimeout(() => {
									setSubmitting(false)
								}, 3000)
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
									className="text-dark-purple min-[720px]:w-[700px] w-full  mx-auto rounded bg-beige px-4 py-7 my-3 border border-light-purple"
								>
									<h1 className="text-xl font-bold text-center my-6">
										Drop You Thoughts
									</h1>

									<CustomInput
										bg="bg-white"
										label="Title"
										htmlFor="title"
										type="text"
										placeholder="Title"
										name="title"
										id="title"
									/>

									<div className="mt-4">
										<label
											htmlFor="content"
											className="block mb-2  mt-2 text-sm font-medium"
										>
											Your Thoughts{" "}
											<span className="text-red">
												{errors.content && touched.content && errors.content}
											</span>
										</label>
										<textarea
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.content}
											className="bg-white outline-none sm:text-sm rounded-lg block w-full p-2.5 resize-none"
											id="content"
											placeholder={`Write your thoughts here..`}
											name="content"
											rows={9}
											cols={33}
											maxLength={3000}
											required
										></textarea>
									</div>

									{addJournalResponse.error && (
										<WarningAlert error={addJournalResponse.error} />
									)}
									<button
										className="mt-3 block hover:opacity-90 max-[500px]:w-3/5 w-2/5 mx-auto text-white bg-dark-purple hover:bg-dark-purple focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
										type="submit"
									>
										{isSubmitting ? <Loader size="h-5 w-5" /> : "Submit"}
									</button>
								</form>
							)}
						</Formik>
					)}
				</>
			)}
		</>
	)
}

export default AddJournalForm