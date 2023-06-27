'use client'
import { Popover, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useState } from "react";

function MyPopover({ username, handleLogout }: { username: string, handleLogout: () => void }) {
	const [isShowing, setIsShowing] = useState(false)
	// const userAccount = document.querySelector('#user-account');
	// const userLinks = document.querySelector('#user-profile');
	// userAccount?.addEventListener('mouseenter', () => setIsShowing(true));

	// userLinks?.addEventListener('mouseleave', () => setIsShowing(false));
	// userLinks?.addEventListener('mouseleave', () => setIsShowing(false));
	return (
		<Popover className="relative">
			{({ open }) => (

				<>
					<Popover.Button
						disabled={isShowing}
						id="user-account"
						onMouseEnter={() => setIsShowing(true)}
						onMouseLeave={() => open ? setIsShowing(false) : null}
						className={`${isShowing ? "text-neo-purple " : ""} outline-none block px-3 rounded-md text-sm font-medium hover:text-neo-purple transition duration-300`}
					>
						User <em>({username})</em>
					</Popover.Button>

					<Transition
						show={isShowing}
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel onMouseLeave={() => setIsShowing(false)} id="user-links" className="absolute right-0 top-9 z-10 shadow-md">
							<div className="bg-white border border-dark-purple rounded-md w-[200px] space-y-1 py-3 ">
								<Link
									id="user-profile"
									className="block text-dark-purple px-3 pb-2 rounded-md text-sm font-medium hover:text-neo-purple transition duration-300 "
									href={`/user/${encodeURI(username)}`}
								>
									<UserIcon className="h-5 w-5 text-dark-purple inline-block mr-1 opacity-70 hover:opacity:100" />Profile
								</Link>
								<Link
									id="forgot-password"
									className="block text-dark-purple px-3 pb-2 rounded-md text-sm font-medium hover:text-neo-purple transition duration-300 "
									href={`/auth/forgot-password`}
								>
									<Cog6ToothIcon className="h-5 w-5 text-dark-purple inline-block mr-1 opacity-70 hover:opacity:100" />Forgot Password
								</Link>
								<button
									id="logout-user"
									onClick={handleLogout}
									className="text-dark-purple px-3 rounded-md text-sm font-medium hover:text-red transition duration-300 "
								>
									<ArrowRightOnRectangleIcon className="h-5 w-5 text-red inline-block mr-1 opacity-70 hover:opacity:100" />Logout
								</button>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}
export default MyPopover;
