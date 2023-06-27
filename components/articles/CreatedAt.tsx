'use client'
import React, { FC } from "react";
interface CreatedAtProps {
	createdAt: string;
}

const CreatedAt: FC<CreatedAtProps> = ({ createdAt }) => {
	return (
		<span className="text-red text-lg -rotate-90 block translate-y-[57px] -translate-x-[54px] w-fit">
			{createdAt.substring(0, 10).split("-").reverse().join(".")}
		</span>
	);
};

export default CreatedAt;
