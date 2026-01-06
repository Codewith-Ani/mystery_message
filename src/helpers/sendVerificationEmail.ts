import { resend } from '@/lib/resend';

import VerificationEmailTemplate from '../../emails/VerificationEmailTemplate';
import { ApiResponse } from '@/types/ApiResponse';

export const sendVerificationEmail = async (
	email: string,
	username: string,
	verifyCode: string
): Promise<ApiResponse> => {
	try {
		if (!process.env.RESEND_API_FROM) {
			throw new Error('RESEND_API_FROM is not defined');
		}
		await resend.emails.send({
			from: process.env.RESEND_API_FROM,
			to: email,
			subject: 'Mystery Messages | Verification Code ',
			react: VerificationEmailTemplate({ username, otp: verifyCode }),
		});

		return {
			success: true,
			message: 'verification email sent successfully',
		};
	} catch (emailError) {
		console.log('Error sending verificiation email', emailError);
		return {
			success: false,
			message: 'Failed to send the verification email',
		};
	}
};
