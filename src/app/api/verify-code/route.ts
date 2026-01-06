import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export const POST = async (request: Request) => {
	await dbConnect();

	try {
		const { username, code } = await request.json();

		const decodedUsername = decodeURIComponent(username);

		const user = await UserModel.findOne({ username: decodedUsername });

		if (!user) {
			return Response.json({
				success: false,
				message: 'User not found',
			});
		}
		const isCodeValid = user.verifyCode === code;
		const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

		if (isCodeValid && isCodeNotExpired) {
			user.isVerified = true;
			await user.save();
			return Response.json(
				{
					success: true,
					message: 'Account Verified Successfully',
				},
				{ status: 200 }
			);
		} else if (!isCodeNotExpired) {
			return Response.json(
				{
					success: false,
					message:
						'Verification code has Expired. Please sign up again to get new code',
				},
				{ status: 400 }
			);
		} else {
			return Response.json(
				{
					success: false,
					message: 'Verification code provided is incorrect',
				},
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error('Error Verifying user', error);
		return Response.json(
			{
				success: false,
				message: 'Error Verifying user',
			},
			{ status: 500 }
		);
	}
};
