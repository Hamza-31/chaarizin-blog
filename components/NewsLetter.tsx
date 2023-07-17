'use client'
import React, { useState } from "react";
import Modal from "./Modal";
import NewsletterForm from "./forms/NewsLetterForm";
import { Gaegu } from 'next/font/google'

const gaegu = Gaegu({ subsets: ['latin'], weight: '400' })

const NewsLetter = () => {
	const [showModal, setShowModal] = useState(false)


	return (
		<section className="mx-5 py-20 mx-auto overflow-hidden">
			{/* <svg
				className="opacity-60 lg:scale-220 md:scale-150 md:translate-x-6 md:translate-y-5 lg:translate-x-24 lg:translate-y-14"
				width="137"
				height="87"
				viewBox="0 0 137 87"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M136 1C130.209 7.22083 122.725 9.49935 114.459 11.6911C108.825 13.1848 111.438 18.2846 110.4 22.6089C109.31 27.1449 104.691 29.1311 100.151 29.4089C98.1447 29.5317 84.5198 27.1397 84.0756 28.5778C83.1429 31.5979 83.9149 35.6785 83.9149 38.8156C83.9149 42.6479 76.456 40.9036 74.0284 40.7422C68.5038 40.375 60.7037 37.7095 58.9976 44.2933C57.8451 48.7407 57.7254 60.0097 52.7281 62.5022C48.15 64.7857 40.5021 62.2014 36.0095 60.84C31.0637 59.3413 28.8812 57.6677 27.3286 62.88C26.8997 64.32 25.997 69.2271 23.792 69.4156C21.7199 69.5926 20.2178 66.6194 18.1253 67.1111C15.5092 67.7259 16.6756 77.2514 16.6383 78.8978C16.5323 83.5829 16.3205 85.2659 11.253 85.32C9.22096 85.3417 0 83.5862 0 86"
					stroke="#DB5F5F"
					strokeLinecap="round"
					className="svg-elem-1"
				></path>
			</svg> */}

			<div className="text-center mx-auto">
				<h4 className={`w-3/4 text-3xl max-[480px]:w-full mx-auto text-neo-purple uppercase mb-12 ${gaegu.className}`}>
					Stay Tuned you guys !{" "}
				</h4>
				<p className="mb-12 w-3/4 mx-auto ">
					Receive latest articles, journal stories and many other things coming
					in the way actually.
				</p>
				<div className="relative">
					<div
						className="absolute z-50 inset-y-0 left-0 right-0 cursor-pointer"
						onClick={() => {
							setShowModal(true);
						}}
					></div>
					{
						showModal ?
							(<Modal>
								<div
									className="absolute flex justify-center items-center inset-y-0 left-0 right-0"
									onClick={() => {
										setShowModal(false);
									}}
								>
									<div className="relative text-white bg-dark-purple rounded w-full min-[460px]:w-[450px] h-fit mx-auto ">
										<div
											onClick={() => {
												setShowModal(false);
											}}
											className="z-50 absolute top-3 cursor-pointer right-2.5 text-red opacity-50 hover:opacity-100 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
										>
											<svg
												aria-hidden="true"
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												></path>
											</svg>
											<span className="sr-only">Close modal</span>
										</div>

										<NewsletterForm />

									</div>
								</div>
							</Modal>) : null
					}
					<form className="mx-2">
						{/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
						<label htmlFor="email" className="hidden">
							Email address
						</label>
						<input
							placeholder="Your email, ila bghiti"
							id="email"
							type="email"
							readOnly
							className="p-2 mx-auto lg:ml-20 min-[826px]:ml-20 lg:w-2/4 md:w-2/4 max-[826px]:w-3/4 max-[450px]:w-full bg-beige"
						/>
						<button
							disabled
							onClick={(e) => e.preventDefault()}
							type="button"
							className="text-red bg-beige max-[826px]:absolute mt-[8px] -translate-x-20 "
						>
							{" "}
							Subscribe
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default NewsLetter;

