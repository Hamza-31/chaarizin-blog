import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailData {
	email: string,
	message: string,
	username: string
}
export const ResendEmailTemplate = ({ email, message, username }: EmailData) => (
	<Html>
		<Head />
		<Preview>{message.slice(0, 100)} ...</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={box}>
					<Text style={paragraph}>
						This message was sent by {username} {`(${email})`}.
					</Text>
					<Hr style={hr} />
					<Text style={paragraph}>
						{message}
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

export default ResendEmailTemplate;

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	padding: '20px 0 48px',
	marginBottom: '64px',
};

const box = {
	padding: '0 48px',
};

const hr = {
	borderColor: '#e6ebf1',
	margin: '20px 0',
};

const paragraph = {
	color: '#525f7f',

	fontSize: '16px',
	lineHeight: '24px',
	textAlign: 'left' as const,
};

const anchor = {
	color: '#556cd6',
};

const button = {
	backgroundColor: '#463F66',
	borderRadius: '5px',
	color: '#fff',
	fontSize: '16px',
	fontWeight: 'bold',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	width: '100%',
};

const footer = {
	color: '#8898aa',
	fontSize: '12px',
	lineHeight: '16px',
};
