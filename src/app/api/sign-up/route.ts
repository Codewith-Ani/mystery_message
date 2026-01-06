import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import { string, success } from 'zod';

export const POST = async (request: Request) => {
	await dbConnect();

	try {
		const { username, email, password } = await request.json();

		const existingUserVerifiedByUsername = await UserModel.findOne({
			username,
			isVerified: true,
		});

		if (existingUserVerifiedByUsername) {
			return Response.json(
				{
					success: false,
					message: 'Username already exists',
				},
				{ status: 400 }
			);
		}

		const existingUserVerifiedByEmail = await UserModel.findOne({ email });

		const verifyCode = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		if (existingUserVerifiedByEmail) {
			if (existingUserVerifiedByEmail.isVerified) {
				return Response.json({
					success: false,
					message: 'User already exist with this email address',
				});
			} else {
				const hashedPassword = await bcrypt.hash(password, 10);
				existingUserVerifiedByEmail.password = hashedPassword;
				existingUserVerifiedByEmail.verifyCode = verifyCode;
				existingUserVerifiedByEmail.verifyCodeExpiry = new Date(
					Date.now() + 3600000
				);
				await existingUserVerifiedByEmail.save();
			}
		} else {
			const hashPassword = await bcrypt.hash(password, 10);
			const expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 1);

			const newUser = new UserModel({
				username: username,
				email: email,
				password: hashPassword,
				verifyCode,
				verifyCodeExpiry: expiryDate,
				isVerified: false,
				isAcceptingMessage: true,
				messages: [],
			});
			await newUser.save();
		}
		const emailResponse = await sendVerificationEmail(
			email,
			username,
			verifyCode
		);
		if (!emailResponse.success) {
			Response.json(
				{
					success: false,
					message: emailResponse.message,
				},
				{ status: 500 }
			);
		}
		return Response.json(
			{
				success: true,
				message:
					'User registered successfully, Please verify using the link in your email.',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error registering user');
		return Response.json(
			{
				success: false,
				message: 'Error registering user',
			},
			{ status: 500 }
		);
	}
};
