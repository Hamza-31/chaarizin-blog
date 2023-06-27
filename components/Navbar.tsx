'use client'
import { Disclosure, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon, Bars3Icon, Cog6ToothIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeButton from "./ThemeButton";
import { useEffect, useState } from "react";
import handleLogoHtmlTag from "@/lib/handleLogoHtmlTags";
import Modal from "./Modal";
import Loader from "./Loader";
import { signOut, useSession } from "next-auth/react";
import MyPopover from "./MyPopOver";
import Reveal from "./motions/Reveal";
// import SearchInput from "./SearchInput";
// import { signOut, useSession } from "next-auth/react";
// import Loader from "./Loader";
// import MyPopover from "./MyPopover";
// import { Fragment } from "react";

const navigation = [
	//   { name: "Home", href: "/" },
	{ name: "Blog", href: "/blog" },
	{ name: "Journal", href: "/journal" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

function classNames(...classes: String[]): string {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	const path = usePathname()
	const router = useRouter();
	const { data: session, status } = useSession()
	const handleLogout = async () => {
		const data = await signOut({
			redirect: false,
			callbackUrl: "/",
		});
	};


	return (
		<header className="dark:border-b-[1px] dark:border-light-purple">
			<Reveal
				hidden={{ opacity: 0, y: 0, x: 0 }}
				visible={{ opacity: 100, y: 0, x: 0 }}
				transition={{ duration: 0.1, delay: 0 }}
			>
				<Disclosure as="nav">
					{({ open }) => (
						<>
							<div className="mx-auto max-w-7xl  max-w-screen-xl md:max-w-screen-xs  ">
								<div className="relative flex min-[640px]:h-16 h-12 items-center justify-between ">
									<div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
										{/* Mobile menu button*/}
										<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-dark-purple  focus:outline-none ">
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XMarkIcon className="block h-8 w-8 dark:text-beige" aria-hidden="true" />
											) : (
												<Bars3Icon className="block h-8 w-8 dark:text-beige" aria-hidden="true" />
											)}
										</Disclosure.Button>
									</div>
									<div className="flex flex-1 items-center justify-center sm:justify-between">
										<Link className="flex flex-shrink-0  items-center" href="/">
											{handleLogoHtmlTag(path)}
										</Link>

										<div className="hidden sm:flex h-[40px] pt-3 justify-between space-x-4 relative">
											{mounted && (
												<ThemeButton />
											)}
											<ul
												id="chaarizin-navigation"
												className="hidden sm:flex sm:ml-6 justify-between space-x-4 border-b-2 dark:border-0"
											>


												{navigation.map((item) => (
													<li
														key={item.name}
														className={classNames(
															path.includes(item.href)
																? "transition duration-300 text-neo-purple dark:text-red"
																: "hover:underline transition duration-300 ease-in-out ",
															"px-3  rounded-md text-sm font-medium"
														)}
													>
														<Link id={item.name} href={item.href}>
															{item.name}
														</Link>
													</li>
												))}
												{session?.user && status === "authenticated" && (
													<MyPopover
														handleLogout={handleLogout}
														username={session.user.username}
													/>
												)}
												{status === "loading" && (
													<li key="loader" className="pr-3 h-fit">
														<Loader size="w-[20px] h-[20px]" />
													</li>
												)}
												{status === "unauthenticated" && (
													<li className="w-11 relative">
														<button
															disabled={path.includes("login")}
															key="login"
															onClick={() => {
																// specify redirect page
																router.push(
																	`/auth/login?callbackUrl=${path}`
																);
															}}
															className={classNames(
																path.includes("login")
																	? "transition duration-300 text-neo-purple dark:text-red"
																	: "hover:underline transition duration-300 ease-in-out ",
																"px-3 mt-0 absolute top-0 right-[3px] rounded-md text-sm font-medium"
															)}
														>
															Login
														</button>
													</li>
												)}

											</ul>
										</div>
									</div>
									{/* <div className=" flex justify-end space-x-4">
									<button onClick={() => setShowModal(true)}>Click</button>
									{
										showModal ?
											(<Modal>
												<div
													className="absolute flex justify-center items-center inset-y-0 left-0 right-0"
													onClick={() => {
														setShowModal(false);
													}}
												>
													<div
														onClick={(e) => e.stopPropagation()}
														className="bg-white z-50">
														<h2>Modal</h2>

														<button className="cursor-pointer" onClick={() => setShowModal(false)} >No</button>

													</div>
												</div>
											</Modal>) : null
									}
								</div> */}
									<div className="sm:hidden flex">

										{mounted && (
											<ThemeButton />
										)}
									</div>
								</div>
							</div>

							<Disclosure.Panel className="sm:hidden transition ease-in-out duration-300">
								<div className="space-y-1 ml-1 px-2 pt-2 pb-3">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as={Link}
											href={item.href}
											className={classNames(
												path.includes(item.href)
													? "text-neo-purple"
													: " hover:translate-x-2 transition duration-300 ease-linear  ",
												"block px-3 py-2 rounded-md text-base font-medium"
											)}
										>
											{item.name}
										</Disclosure.Button>
									))}
									{status === "loading" && (
										<li key="loader" className="pr-3 h-fit">
											<Loader size="w-[20px] h-[20px]" />
										</li>
									)}
									{status === "unauthenticated" && (

										<button
											disabled={path.includes("login")}
											key="login"
											onClick={() => {
												// specify redirect page
												router.push(
													`/auth/login?callbackUrl=${path}`
												);
											}}
											className={classNames(
												path.includes("login")
													? "text-neo-purple"
													: " hover:translate-x-2 transition duration-300 ease-linear  ",
												"block px-3 py-2 rounded-md text-base font-medium"
											)}
										>
											Login
										</button>

									)}
									{session?.user && status === "authenticated" && (
										<>
											<Link
												id="user-profile"
												className={classNames(
													path.includes("user")
														? "text-neo-purple"
														: " hover:translate-x-2 transition duration-300 ease-linear  ",
													"block px-3 py-2 rounded-md text-base font-medium"
												)}
												href={`/user/${encodeURI(session.user.username)}`}
											>
												Your account <em>({session.user.username})</em>
											</Link>
											<Link
												id="forgot-password"
												className={classNames(
													path.includes("forgot-password")
														? "text-neo-purple"
														: " hover:translate-x-2 transition duration-300 ease-linear  ",
													"block px-3 py-2 rounded-md text-base font-medium"
												)}
												href={`/auth/forgot-password`}
											>
												Forgot Password
											</Link>
											<button
												id="logout-user"
												onClick={handleLogout}
												className="text-red hover:translate-x-2 transition duration-300 ease-linear block px-3 py-2 rounded-md text-base font-medium"
											>
												Logout
											</button>
										</>
									)}
									{/* {status === "authenticated" && (
                    <>
                      <Link
                        className="text-dark-purple hover:translate-x-2 transition duration-300 ease-linear block px-3 py-2 rounded-md text-base font-medium"
                        href={`/user/${session.user.id}`}
                      >
                        Profile
                      </Link>
                      <Disclosure.Button
                        key="logout"
                        onClick={handleLogout}
                        className="text-dark-purple hover:translate-x-2 transition duration-300 ease-linear block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Logout {session.user.username}
                      </Disclosure.Button>
                    </>
                  )}
                  {status === "unauthenticated" && (
                    <Disclosure.Button
                      key="login"
                      as={Link}
                      href="/auth/login"
                      className="text-dark-purple hover:translate-x-2 transition duration-300 ease-linear block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Login
                    </Disclosure.Button>
                  )} */}
								</div>
							</Disclosure.Panel>

						</>
					)}
				</Disclosure>
			</Reveal>
		</header>
	);
}
