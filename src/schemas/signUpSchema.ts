import { z } from 'zod';

export const usernameValidation = z
	.string()
	.min(2, 'Username must be at least 2 characters')
	.max(20, 'Username must be at most 20 characters')
	.regex(/^[a-zA-Z0-9]+$/, 'must not contain special characters');

export const emailValidation = z
	.string()
	.trim()
	.refine(
		(val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
		'Invalid email address'
	);

export const signUpSchema = z.object({
	username: usernameValidation,
	email: emailValidation,
	password: z
		.string()
		.trim()
		.min(6, { error: 'password must be at least 6 characters' }),
});
