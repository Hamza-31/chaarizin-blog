'use client'
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./Loader";
import { signOut, useSession } from "next-auth/react";

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
const MobileMenu = () => {
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
			</div>
		</Disclosure.Panel>
	)
}

export default MobileMenu