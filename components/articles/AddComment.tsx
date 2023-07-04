

'use client'
import React, { useState } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import axiosClient from "@/lib/clientAxios";
import { addCommentSchema } from "@/lib/FormikSchema";
import WarningAlert from "../WarningAlert";


const AddComment = ({ articleId }: { articleId: number }) => {
	const { data: session, status } = useSession() as any;
	const [commentResponse, setCommentResponse] = useState({ message: "", error: "" });
	const router = useRouter();
	const path = usePathname()

	const handleAddComment = async ({ comment }: { comment: string }) => {
		if (!session) return
		try {
			const res = await axiosClient.post(`/api/comments`, {
				author: session.user?.id,
				article: articleId,
				content: comment,
				accessToken: session?.accessToken
			})
			setCommentResponse(res.data);
		} catch (error) {
			console.log("AddComment Client Error : ", error)
			setCommentResponse({ error: "Network might be slow, please try again.", message: "" })
		}
	};
	return (
		<>
			{commentResponse.message && (
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<div
						className="p-4 mb-4 text-sm text-neo-purple rounded-lg flex justify-center items-center"
						role="alert"
					>
						<p className="ml-2 text-lg text-center border border-neo-purple bg-neo-purple-light px-5 py-3 rounded-md">
							{commentResponse.message}
						</p>
					</div>
				</div>
			)}
			{!commentResponse.message && (


				<Formik
					initialValues={{ comment: "" }}
					validationSchema={addCommentSchema}
					onSubmit={(values) => {
						if (status === "authenticated") {
							handleAddComment(values);
						}
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
							id="add-comment"
							onSubmit={handleSubmit}
							className=" md:w-3/5 w-4/5 max-[500px]:w-full mx-auto mb-4 px-6"
						>
							<div className="relative">
								{status !== "authenticated" && (
									<div className="absolute top-0 left-0 bottom-0 right-0 z-22 bg-neo-purple-light opacity-50 flex justify-center items-center">
										<button
											type="button"
											onClick={() => {
												router.push(
													`/auth/login?callbackUrl=${path}#add-comment`
												);
											}}
											className=" border border-dark-purple dark:text-dark-purple rounded-md py-1 px-6 shadow-md"
										>
											Login
										</button>
									</div>
								)}

								<div className="px-4 py-2 bg-beige rounded-lg pt-3 ">
									<label htmlFor="comment" className="sr-only">
										Your comment{" "}

									</label>
									<textarea
										id="comment"
										name="comment"
										rows={4}
										className="w-full min-[500px]:p-3 text-sm text-gray-900  bg-beige resize-none focus:outline-none"
										placeholder="Leave a comment..."
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.comment}
										required
										readOnly={session ? false : true}
										maxLength={300}
									></textarea>

									<div className="flex justify-end">
										<button className="" type="submit">
											<ArrowLongRightIcon width={24} color="#DB5F5F" />
										</button>
									</div>
								</div>
								<span className="text-red pt-2">
									{errors.comment && touched.comment && errors.comment}

								</span>
							</div>
							{commentResponse.error && (
								<WarningAlert error={commentResponse.error} />

							)}
						</form>
					)}
				</Formik>
			)}
		</>
	);
};

export default AddComment;

