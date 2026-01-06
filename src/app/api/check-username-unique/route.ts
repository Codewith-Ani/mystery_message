import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { success, z } from 'zod';
import { usernameValidation } from '@/schemas/signUpSchema';

const UsernameQuerySchema = z.object({
	username: usernameValidation,
});

export const GET = async (request: Request) => {
	await dbConnect();

	try {
		const { searchParams } = new URL(request.url);
		const queryParam = {
			username: searchParams.get('username'),
		};

		// validate with zod
		const result = UsernameQuerySchema.safeParse(queryParam);

		console.log('RESULT:', result); // Remove later

		if (!result.success) {
			const usernameErrors = result.error.issues
				.filter((issue) => issue.path[0] === 'username')
				.map((issue) => issue.message);

			console.log(usernameErrors);

			return Response.json(
				{
					success: false,
					message:
						usernameErrors.length > 0 ?
							usernameErrors.join(',')
						:	'Invalid query parameter',
				},
				{ status: 400 }
			);
		}
		const { username } = result.data;
		const existingVerifiedUser = await UserModel.findOne({
			username,
			isVerified: true,
		});

		if (existingVerifiedUser) {
			return Response.json(
				{
					success: false,
					message: 'Username is already taken',
				},
				{ status: 400 }
			);
		}
		return Response.json(
			{
				success: true,
				message: 'Username is available',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error Checking username', error);
		return Response.json(
			{
				success: false,
				message: 'Error checking username',
			},
			{ status: 500 }
		);
	}
};
