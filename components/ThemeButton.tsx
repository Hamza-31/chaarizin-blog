'use client'

import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { useTheme } from "next-themes"

const ThemeButton = () => {
	const { theme, resolvedTheme, setTheme } = useTheme()
	return (
		<button
			aria-label="Toggle Dark Mode"
			type="button"
			className="flex items-start justify-center rounded-lg"
			onClick={() => { setTheme(theme === "dark" ? "light" : "dark") }}
		>
			{
				resolvedTheme === "light" ? (
					<MoonIcon className="h-5 w-5 text-dark-purple hover:scale-125 transition ease-in-out duration-200" />

				) : (
					<SunIcon className="h-5 w-5 text-beige hover:scale-125 transition ease-in-out duration-200" />
				)
			}
		</button>
	)
}

export default ThemeButton