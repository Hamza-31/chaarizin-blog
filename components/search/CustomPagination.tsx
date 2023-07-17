'use client'

import { isModifierClick } from "@/lib/isModifiedClick";
import React from "react";
import { UsePaginationProps, usePagination } from "react-instantsearch-hooks-web";
import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

export type PaginationProps = React.ComponentProps<'div'> & UsePaginationProps;

const CustomPagination = (props: PaginationProps) => {
	const {
		refine,
		createURL,
		pages,
		currentRefinement,
		isFirstPage,
		isLastPage,
		nbPages,
		canRefine,
	} = usePagination(props);
	return (
		<div    >
			<ul className="ais-Pagination-list my-9 flex justify-center mx-auto block text-xl space-x-16">

				<PaginationItem
					aria-label="Previous"
					value={currentRefinement - 1}
					isDisabled={isFirstPage}
					createURL={createURL}
					refine={refine}
				>
					<ArrowLongLeftIcon className={`mr-2 inline ${isFirstPage ? "hidden" : ""}`} width={24} />
				</PaginationItem>

				{pages.map((page) => (
					<PaginationItem
						key={page}
						aria-label={String(page)}
						value={page}
						isDisabled={false}
						createURL={createURL}
						refine={refine}
						className={`${page === currentRefinement ? "text-red drop-shadow-xl" : ""}`}
					>
						{page + 1}
					</PaginationItem>
				))}

				<PaginationItem
					aria-label="Next"
					value={currentRefinement + 1}
					isDisabled={isLastPage}
					createURL={createURL}
					refine={refine}
				>
					<ArrowLongRightIcon className={`ml-2 inline ${isLastPage ? "hidden" : ""}`} width={24} />
				</PaginationItem>


			</ul>
		</div>
	);
}

export default CustomPagination

type PaginationItemProps = React.ComponentProps<'a'> &
	Pick<ReturnType<typeof usePagination>, 'refine' | 'createURL'> & {
		isDisabled: boolean;
		value: number;
	};

const PaginationItem = (props: PaginationItemProps) => {
	const { isDisabled, className, href, value, createURL, refine, ...rest } =
		props;

	if (isDisabled) {
		return (
			<li >
				<span

					className="ais-Pagination-link" {...rest} />
			</li>
		);
	}

	return (
		<li className={className}>
			<a
				className="ais-Pagination-link"
				href="#search"
				onClick={(event) => {
					if (isModifierClick(event)) {
						return;
					}

					event.preventDefault();
					refine(value);
				}}
				{...rest}
			/>
		</li>
	);
}
