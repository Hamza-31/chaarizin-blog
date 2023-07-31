'use client'
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeButton from "./ThemeButton";
import { useEffect, useState } from "react";
import handleLogoHtmlTag from "@/lib/handleLogoHtmlTags";
import Loader from "./Loader";
import { signOut, useSession } from "next-auth/react";
import MyPopover from "./MyPopOver";
import Reveal from "./motions/Reveal";
import dynamic from 'next/dynamic'
const MobileMenu = dynamic(() => import('./MobileMenu'))

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
	const [show, setShow] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const controlNavbar = () => {
		if (typeof window !== 'undefined') {
			if (window.scrollY < 45 || window.scrollY < lastScrollY) { // if scroll down hide the navbar
				setShow(false);
			} else { // if scroll up show the navbar
				setShow(true);
			}

			// remember current page location to use in the next move
			setLastScrollY(window.scrollY);
		}
	};
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', controlNavbar);

			// cleanup function
			return () => {
				window.removeEventListener('scroll', controlNavbar);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastScrollY])
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
		<header className={`dark:border-b-[1px] dark:border-light-purple dark:bg-dark-purple bg-white w-full fixed z-50 shadow-md ${show && 'hidden'}`}>
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
										<Link className="ml-7 flex flex-shrink-0  items-center" href="/">
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
									<div className="sm:hidden flex mr-4">

										{mounted && (
											<ThemeButton />
										)}
									</div>
								</div>
							</div>

							<MobileMenu />

						</>
					)}
				</Disclosure>
			</Reveal>
		</header>
	);
}
