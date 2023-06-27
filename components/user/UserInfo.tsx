'use client'
import { useSession } from "next-auth/react";
import React from "react";
import Loader from "../Loader";
import { useTheme } from "next-themes";

const UserInfo = () => {
	const { data: session } = useSession() as any
	const theme = useTheme()
	if (session) {
		return (
			<div className="flex items-center space-x-2 py-6">
				<svg
					className=" w-12 h-12 bg-light-purple dark:bg-beige  rounded-full p-2"
					fill={theme.resolvedTheme === "dark" ? "#463F66" : "currentColor"}
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clipRule="evenodd"
					></path>
				</svg>
				<div className="font-medium">
					<div className="dark:text-red">{session?.user.username}</div>
					<div className="text-sm">{session?.user.email}</div>
				</div>
			</div>
		)
	}
	return (
		<div className="flex items-center justify-center space-x-2 py-6">
			<Loader size="h-5 w-5" />
		</div>
	);
};

export default UserInfo;
