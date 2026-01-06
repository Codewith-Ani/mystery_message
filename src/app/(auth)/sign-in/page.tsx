'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const SignIn = () => {
	const { data: session } = useSession();

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-950 px-4'>
			<div className='w-full max-w-sm rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg'>
				{session ?
					<div className='space-y-4 text-center'>
						<p className='text-sm text-gray-400'>Signed in as</p>

						<p className='break-all text-sm font-medium text-gray-100'>
							{session.user?.email}
						</p>

						<button
							onClick={() => signOut()}
							className='w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
						>
							Sign out
						</button>
					</div>
				:	<div className='space-y-4 text-center'>
						<p className='text-sm text-gray-400'>
							You are not signed in
						</p>

						<button
							onClick={() => signIn()}
							className='w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							Sign in
						</button>
					</div>
				}
			</div>
		</div>
	);
};

export default SignIn;
