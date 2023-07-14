'use client'
import React, { useState } from 'react'
import { useRefinementList } from 'react-instantsearch-hooks-web';
import { Gaegu } from 'next/font/google'

const gaegu = Gaegu({ subsets: ['latin'], weight: '400' })

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
		<nav className='min-[1024px]:col-span-2 max-[1024px]:mb-2'>
			<ul className="flex justify-end space-x-2 flex-wrap px-2 mx-auto md:w-10/12 w-full">
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
							className={`${gaegu.className} opacity-75 hover:opacity-100 flex items-center text-md min-[500px]:text-lg min-[1024px]:text-xl min-[640px]:text-md justify-center p-2 rounded-lg cursor-pointer bg-beige dark:text-dark-purple peer-checked:bg-light-purple peer-checked:font-bold transition ease-in-out duration-100`}
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