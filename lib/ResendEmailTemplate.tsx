import * as React from 'react';

interface EmailTemplateProps {
	email: string;
}

export const ResendEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	email,
}) => (
	<div>
		<h1>Welcome, {email}!</h1>
	</div>
);