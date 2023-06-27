'use client'
import MotionWrapper from "@/components/motions/MotionWrapper";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const NotFound = () => {
	return (
		<main className="h-screen">
			<MotionWrapper>
				<div className="flex items-center justify-center min-h-screen bg-dark-purple">
					<div className="col-sm-8 text-gray-50 text-center -mt-52">
						<div className="relative ">
							<h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
								<span className=" font-patrickHand">4</span>
								<span className=" font-patrickHand">0</span>
								<span className=" font-patrickHand">4</span>
							</h1>
							<span className="absolute top-0 font-patrickHand -ml-12 text-gray-300 font-semibold">
								Oops!
							</span>
						</div>
						<h5 className="text-gray-300 font-patrickHand font-semibold -mt-3">
							Page not found
						</h5>
						<p className="text-gray-100 mt-2 mb-6">
							we are sorry, but the page you requested was not found
						</p>
						<Link
							href="/"
							className="px-5 py-3 text-sm text-light-purple underline shadow-sm font-medium"
						>
							Home<ArrowLongRightIcon className="ml-2 inline" width={24} />
						</Link>
					</div>
				</div>
			</MotionWrapper>
		</main>
	);
};

export default NotFound;
