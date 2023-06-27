const handleLogoHtmlTag = (path: string) => {
	if (path === "/") {
		return (
			<h1
				id="logo"
				className="min-[640px]:text-3xl text-2xl text-neo-purple dark:text-beige max-[640px]:ml-7 ml-1 font-playfairDisplay"
			>
				Chaarizin
			</h1>
		);
	}
	return (
		<p
			id="logo"
			className="min-[640px]:text-3xl text-2xl text-neo-purple dark:text-beige max-[640px]:ml-7 ml-1 font-playfairDisplay"
		>
			Chaarizin
		</p>
	);
};
export default handleLogoHtmlTag