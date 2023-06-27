"use client"
import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ page, lastPage }: { page: number, lastPage: boolean }) => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const path = usePathname()

	const selectNextArticles = (hasPage: boolean) => {

		if (hasPage) router.push(`${path}?page=${+page + 1}`)
		router.push(`${path}?page=2`)
	}
	const selectPreviousArticles = (hasPage: boolean) => {
		if (+page === 1 || +page === 0 || +page === 2) {
			router.push(path)
		} else if (hasPage) {
			router.push(`${path}?page=${+page - 1}`)
		}
	}
	return (
		<nav aria-label="Page navigation example">
			<ul className="my-9 flex justify-center mx-auto block text-xl space-x-6px">
				<li>
					<button
						className={`px-3 py-2 ${page <= 1 ? "text-gray-300" : "text-red"}`}
						onClick={() => {
							selectPreviousArticles(searchParams.has('page'))
						}}
						disabled={page <= 1}
					>
						<ArrowLongLeftIcon className="mr-2 inline" width={24} />
					</button>
				</li>

				<li>
					<button
						className={`px-3 py-2 ${lastPage ? "text-gray-300" : "text-red"}`}
						onClick={() => {
							selectNextArticles(searchParams.has('page'))
						}}
						disabled={lastPage}
					>
						<ArrowLongRightIcon className="ml-2 inline" width={24} />
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
