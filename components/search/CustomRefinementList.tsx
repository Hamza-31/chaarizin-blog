'use client'
import React, { useState } from 'react'
import { useRefinementList } from 'react-instantsearch-hooks-web';

const CustomRefinementList = (props: any) => {
	const {
		items,
		hasExhaustiveItems,
		createURL,
		refine,
		sendEvent,
		searchForItems,
		isFromSearch,
		canRefine,
		canToggleShowMore,
		isShowingMore,
		toggleShowMore,
	} = useRefinementList(props);

	return (
		<nav>
			<ul className="flex justify-around flex-wrap px-2 absolute inset-x-0 -top-16  mx-auto md:w-10/12 w-full">
				{items.map((item) => (
					<li key={item.value} className=" text-center ">
						<input
							type="checkbox"
							id={item.value}
							value={item.value}
							onChange={(e) => {
								// e.preventDefault()
								refine(item.value)
							}}
							className="hidden peer"
							checked={item.isRefined || isFromSearch}
						/>
						<label
							htmlFor={item.value}
							className="flex items-center text-md min-[500px]:text-lg min-[1024px]:text-xl min-[640px]:text-md justify-center p-2 underline cursor-pointer hover:text-neo-purple peer-checked:font-bold font-patrickHand rounded-md peer-checked:text-neo-purple "
						>
							<div className="block">
								<div className="w-full ">{item.value}</div>
							</div>
						</label>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default CustomRefinementList