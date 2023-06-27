import Link from "next/link";
import React from "react";

const BreadCrumb = ({ postTitle, page }: { postTitle: string, page: string }) => {
	return (
		<nav
			className="flex max-[1044px]:ml-2 max-[640px]:ml-3 my-3"
			aria-label="Breadcrumb"
		>
			<ol className="inline-flex items-center space-x-1 md:space-x-3">
				<li className="inline-flex items-center">
					<Link
						href="/"
						className="inline-flex items-center text-xs font-light hover:text-red transition ease-in duration-100 "
					>
						<svg
							aria-hidden="true"
							className="w-4 h-4 mr-2 opacity-70"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
						</svg>
						Home
					</Link>
				</li>
				<li>
					<div className="flex items-center">
						<svg
							aria-hidden="true"
							className="w-3 h-3 "
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							></path>
						</svg>
						<Link
							href={`/${page.toLowerCase()}`}
							className="ml-1 text-xs font-light hover:text-red transition ease-in duration-100  "
						>
							{page}
						</Link>
					</div>
				</li>
				{postTitle && (
					<li aria-current="page">
						<div className="flex items-center">
							<svg
								aria-hidden="true"
								className="w-3 h-3"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="ml-1 text-xs font-light md:ml-2">
								{postTitle}
							</span>
						</div>
					</li>
				)}
			</ol>
		</nav>
	);
};

export default BreadCrumb;
