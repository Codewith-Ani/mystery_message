import {
	Html,
	Body,
	Container,
	Heading,
	Text,
	Hr,
	Section,
} from '@react-email/components';

interface VerificationEmailTemplateProps {
	username: string;
	otp: string; // 6-digit numeric OTP
	expiresInMinutes?: number;
}

const VerificationEmailTemplate = ({
	username,
	otp,
	expiresInMinutes = 10,
}: VerificationEmailTemplateProps) => {
	return (
		<Html>
			<Body style={bodyStyle}>
				<Container style={containerStyle}>
					<Heading style={headingStyle}>
						Email verification required
					</Heading>

					<Text style={textStyle}>Hi {username},</Text>

					<Text style={textStyle}>
						We received a request to verify your email address.
						Please enter the following one-time password (OTP) on
						the website to continue.
					</Text>

					<Section style={otpSectionStyle}>
						<Text style={otpStyle}>{otp}</Text>
					</Section>

					<Text style={textStyle}>
						This OTP is valid for {expiresInMinutes} minutes. Do not
						share this code with anyone.
					</Text>

					<Hr style={hrStyle} />

					<Text style={footerTextStyle}>
						If you did not attempt to verify your email, you can
						safely ignore this message.
					</Text>

					<Text style={footerTextStyle}>— The Team</Text>
				</Container>
			</Body>
		</Html>
	);
};

export default VerificationEmailTemplate;

/* ===================== */
/* Inline styles */
/* ===================== */

const bodyStyle: React.CSSProperties = {
	backgroundColor: '#f4f4f7',
	padding: '20px',
	fontFamily: 'Arial, Helvetica, sans-serif',
};

const containerStyle: React.CSSProperties = {
	backgroundColor: '#ffffff',
	borderRadius: '8px',
	padding: '32px',
	maxWidth: '480px',
	margin: '0 auto',
};

const headingStyle: React.CSSProperties = {
	marginBottom: '16px',
	color: '#111827',
};

const textStyle: React.CSSProperties = {
	fontSize: '14px',
	color: '#374151',
	lineHeight: '1.6',
};

const otpSectionStyle: React.CSSProperties = {
	backgroundColor: '#f3f4f6',
	borderRadius: '8px',
	padding: '20px',
	textAlign: 'center',
	margin: '24px 0',
};

const otpStyle: React.CSSProperties = {
	fontSize: '28px',
	fontWeight: 700,
	letterSpacing: '6px',
	color: '#111827',
};

const hrStyle: React.CSSProperties = {
	margin: '24px 0',
	borderColor: '#e5e7eb',
};

const footerTextStyle: React.CSSProperties = {
	fontSize: '12px',
	color: '#6b7280',
};
