'use client'
import { Formik, FormikErrors, FormikValues } from "formik";

import Link from "next/link";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import axiosClient from "@/lib/clientAxios";
import { newsletterSchema } from "@/lib/FormikSchema";
import Loader from "../Loader";


interface NewsletterResponse {
	message?: string;
	error?: string;
}

const NewsletterForm = () => {
	const [newletterResponse, setnewletterResponse] = useState<NewsletterResponse>({});

	const handleAddNewletterContact = async ({ email }: { email: string }) => {
		if (!email) return
		try {
			const res = await axiosClient.post("/api/newsletter", {
				email: email
			})
			setnewletterResponse(res.data);
		} catch (error) {
			console.log("Error Adding contact newsletter", error)
			setnewletterResponse({ error: "Network might be slow, please try again.", message: "" })
		}
	}
	return (
		<Formik
			initialValues={{ email: "" }}
			onSubmit={async (values, { setSubmitting }) => {
				handleAddNewletterContact(values)
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
				<form
					onClick={(e) => e.stopPropagation()}
					onSubmit={handleSubmit}
					className="text-left transition ease-in-out duration-200 p-6   drop-shadow transition ease-in-out delay-200"
				>

					<h2 className="text-xl text-center ">
						Chaarizin NewsLetter
					</h2>

					{!newletterResponse.message && (
						<>
							<div className=" space-y-4 md:space-y-6 items-center mx-auto mt-6 mb-3 space-y-4 w-full sm:w-[400px]">
								{newletterResponse.error && (
									<div
										className="p-4 mb-4 text-sm text-red rounded-lg"
										role="alert"
									>
										{newletterResponse.error}
									</div>
								)}
								<CustomInput
									bg=""
									label="Your email"
									htmlFor="email"
									type="email"
									placeholder="your@email.com"
									name="email"
									id="email"
								/>
								<div>
									<button
										type="submit"
										className="py-3 block hover:opacity-90 w-3/5 mx-auto text-sm font-medium text-center  bg-beige text-dark-purple  rounded-lg border cursor-pointer"
									>
										{isSubmitting ? <Loader size='h-5 w-5' /> : "Subscribe"}
									</button>
								</div>
							</div>
							<div className="mx-auto max-w-screen-sm text-sm text-left newsletter-form-footer ">
								We care about the protection of your data.{" "}
								<Link
									href="/privacy-policy"
									className="font-medium underline"
								>
									Read our Privacy Policy
								</Link>
								.
							</div>
						</>
					)}
					{newletterResponse.message && (
						<div className="p-4 mb-4 text-sm rounded-lg" role="alert">
							{newletterResponse.message}
						</div>
					)}
				</form>
			)}
		</Formik>
	);
};

export default NewsletterForm;
