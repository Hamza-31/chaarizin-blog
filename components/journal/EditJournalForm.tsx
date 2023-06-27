'use client'
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import CustomInput from "../forms/CustomInput";
import Loader from "../Loader";
import { addJournalSchema } from "@/lib/FormikSchema";
import { useSession } from "next-auth/react";
import axiosClient from "@/lib/clientAxios";
import WarningAlert from "../WarningAlert";
import { usePathname, useRouter } from "next/navigation";

const EditJournalForm = ({
	//   status,
	//   session,
	setShowModal,
	editJournal,
	//   editJournalResponse,
}: any) => {
	const session = useSession() as any
	const router = useRouter()
	const [editJournalResponse, setEditJournalResponse] = useState({
		error: "",
		message: ""
	})
	useEffect(() => {
		setTimeout(() => {
			if (editJournalResponse.message) {
				router.refresh()
			}
		}, 3000)
	})
	const handleEditJournal = async ({ title, content }: { title: string, content: string }) => {
		if (!content || !title || !session) return
		try {
			const res = await axiosClient.post('/api/journals/update', {
				id: editJournal.id,
				title: title,
				content: content,
				author: session.data.user?.id,
				accessToken: session?.data.accessToken
			})
			setEditJournalResponse(res.data)
		} catch (error) {
			console.log("Error Adding Journal Client", error)
			setEditJournalResponse({ error: "Network might be slow, please try again.", message: "" })
		}

	}
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="relative bg-beige transition p-6 w-[650px] max-[660px]:w-full h-fit mx-auto z-100 rounded drop-shadow"
		>
			<h2 className="text-dark-purple text-center text-xl">Edit Journal </h2>
			<div
				onClick={() => {
					setShowModal(false);
				}}
				className="absolute top-3 cursor-pointer right-2.5 text-dark-purple opacity-50 hover:opacity-100 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
			>
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					></path>
				</svg>
				<span className="sr-only">Close modal</span>
			</div>
			<div className="mt-7">
				{editJournal.title && (
					<>
						{!editJournalResponse.message && (
							<Formik
								enableReinitialize={true}
								initialValues={{
									title: editJournal.title,
									content: editJournal.content,
								}}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										setSubmitting(false)
									}, 3000)
									handleEditJournal(values)
								}}
								validationSchema={addJournalSchema}
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
									<form onSubmit={handleSubmit} className="text-dark-purple">
										<CustomInput
											bg="bg-white"
											label="Title"
											htmlFor="title"
											type="text"
											placeholder="Title"
											name="title"
											id="title"
										/>
										<div>
											<label
												htmlFor="content"
												className="block mb-2  mt-2 text-sm font-medium"
											>
												Your Thoughts{" "}
												<span className="text-red">
													{(errors.content && touched.content && errors.content) as string}
												</span>
											</label>
											<textarea
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.content}
												className="border bg-white outline-none sm:text-sm rounded-lg block w-full p-2.5 resize-none"
												id="content"
												placeholder={`Write your thoughts here..`}
												name="content"
												rows={9}
												maxLength={3000}
												cols={33}
												required
											></textarea>
										</div>

										<button
											type="submit"
											className="block mt-3 hover:opacity-90 max-[500px]:w-3/5 w-2/5 mx-auto text-white bg-dark-purple hover:bg-dark-purple focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
										>
											{isSubmitting ? <Loader size="h-5 w-5" /> : "Save"}
										</button>
										{editJournalResponse.error && (
											<WarningAlert error={editJournalResponse.error} />
										)}
									</form>
								)}
							</Formik>
						)}
						{editJournalResponse.message && (
							<p className="text-center bg-white text-dark-purple px-6 py-4 border border-neo-purple rounded-md">
								{editJournalResponse.message}
							</p>
						)}
					</>
				)}
				{/* {!editJournal.title && <Loader />} */}
			</div>
		</div>
	);
};

export default EditJournalForm;