import SocialLinks from '@/components/SocialLinks'
import ContactForm from '@/components/forms/ContactForm'
import Reveal from '@/components/motions/Reveal'
import React from 'react'

const Contact = () => {
	return (
		<>
			<div className="min-[1094px]:block hidden absolute top-0 -left-7">
				<SocialLinks grid="" color="#463F66" />
			</div>
			<section className="min-[620px]:w-[600px] w-full mx-auto">
				<h2 className="pt-16 pb-10 uppercase text-4xl text-center">
					Contact
				</h2>
				<p className="text-center text-lg">
					Feel free to email on{" "}
					<a className="text-neo-purple" href="mailto:contact@chaarizin.com">
						contact@chaarizin.com
					</a>
					<span className="block py-8">or</span>
				</p>
				<ContactForm />
			</section>
		</>
	)
}

export default Contact