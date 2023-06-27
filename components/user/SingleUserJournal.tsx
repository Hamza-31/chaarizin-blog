'use client'
import { Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import EditJournalButton from "../forms/EditJournalButton";
import Modal from "../Modal";
import EditJournalForm from "../journal/EditJournalForm";
import axiosClient from "@/lib/clientAxios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SingleUserJournal = ({
	journal,
	// handleDeleteJournal,
	// setOpenModal,
	// setEditJournal,
	// setDeleteJournal,
	// deleteJournal,
	// deleteJournalResponse,
}: any) => {
	const session = useSession() as any
	const router = useRouter()
	const [showModal, setShowModal] = useState(false)
	const [editJournal, setEditJournal] = useState({
		id: null,
		title: "",
		content: "",
	});
	const [deleteJournalResponse, setDeleteJournalResponse] = useState({
		message: "",
		error: ""
	})
	const [deleteJournal, setDeleteJournal] = useState({
		id: null,
	});
	const handleDeleteJournal = async (journalId: number) => {
		if (journalId === null) return
		try {
			const res = await axiosClient.post("/api/journals/delete", {
				id: journalId,
				accessToken: session?.data.accessToken
			})
			setDeleteJournalResponse({ message: "Journal Deleted", error: "" })
		} catch (error) {
			console.log("Error Deleting Journal client : ", error)
			setDeleteJournalResponse({ message: "", error: "Network might be slow, please try again." })
		}
	}
	useEffect(() => {
		setTimeout(() => {
			if (deleteJournalResponse.message) {
				router.refresh()
			}
		}, 3000)
	})
	return (
		<article className=" text-dark-purple relative group m-2 overflow-hidden rounded-md  bg-beige py-6 px-4  border border-dark-purple hover:shadow-lg hover:scale-101  transition duration-100 ease-in-out">
			<EditJournalButton
				journal={journal}
				setShowModal={setShowModal}
				setEditJournal={setEditJournal}
				setDeleteJournal={setDeleteJournal}
			/>
			{
				showModal ?
					(<Modal>
						<div
							className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0"
							onClick={() => {
								setShowModal(false);
							}}
						>
							<div className="relative rounded w-full h-fit mx-auto ">
								<EditJournalForm editJournal={editJournal} setShowModal={setShowModal} />
							</div>
						</div>
					</Modal>) : null
			}
			<Transition
				show={deleteJournal.id ? true : false}
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<div
					className={`space-x-1 flex justify-center items-center absolute inset-0 top-0 bottom-0 left-0 right-0 ${deleteJournal.id !== journal.id
						? "hidden"
						: "transition ease-in duration-200 bg-beige"
						}`}
				>
					{deleteJournalResponse.message && <p>{deleteJournalResponse.message}</p>}
					{deleteJournalResponse.error && <p>{deleteJournalResponse.error}</p>}
					{!deleteJournalResponse.message && (
						<>
							<button
								onClick={() => {
									setDeleteJournal({ id: null, });
								}}
								className="rounded-sm py-1 w-20 px-3 border border-neo-purple text-neo-purple"
								type="button"
							>
								Cancel
							</button>
							<button
								onClick={() => {
									handleDeleteJournal(journal.id);
								}}
								className="rounded-sm py-1 w-20 px-3 border border-red text-red"
								type="button"
							>
								Delete
							</button>
						</>
					)}
				</div>
			</Transition>
			<div className="space-y-2">
				<h3 className="text-xl break-normal">{journal.title}</h3>
				<p className="break-all text-sm">
					{journal.content.substring(0, 100).length >= 100
						? `${journal.content.substring(0, 100)}...`
						: journal.content.substring(0, 100)}
				</p>
			</div>
		</article>
	);
};

export default SingleUserJournal;
