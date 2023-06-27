
import AddJournalForm from '@/components/journal/AddJournalForm'
import MotionWrapper from '@/components/motions/MotionWrapper'
import React from 'react'

const CreateJournalPage = () => {
	return (
		<MotionWrapper>
			<section className="h-screen">
				<AddJournalForm />
			</section>
		</MotionWrapper>
	)
}

export default CreateJournalPage