import React from "react";
const options: { year: string, month: string, day: string } = { year: "numeric", month: "short", day: "numeric" };
const TimeAgo = ({ timestamps }: { timestamps: string }) => {
	let time = "";
	if (timestamps) {
		const date = new Date(timestamps);
		const formattedDate = date.toLocaleDateString("en-US", options as any);
		time = formattedDate;
	}
	return (
		<span title={timestamps}>
			&nbsp; <i>{time}</i>
		</span>
	);
};

export default TimeAgo;
