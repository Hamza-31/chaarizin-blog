import React from "react";
import { UseSortByProps, useSortBy } from "react-instantsearch-hooks-web";

export type SortByProps = React.ComponentProps<'div'> & UseSortByProps;
const CustomSortBy = (props: SortByProps) => {
	const { currentRefinement, options, refine } = useSortBy(props);

	return (
		<div className="ais-SortBy flex justify-end">
			<select
				id="sort-articles"
				className="mt-2 cursor-pointer bg-beige opacity-70 hover:opacity-100 rounded text-dark-purple focus:outline-none focus:opacity-100"
				onChange={(event) => refine(event.target.value)}
				defaultValue={currentRefinement}
			>
				{options.map(({ label, value }) => (
					<option className="ais-SortBy-option hover:bg-red" key={value} value={value}>
						{label}
					</option>
				))}
			</select>
		</div>
	);
}


export default CustomSortBy
