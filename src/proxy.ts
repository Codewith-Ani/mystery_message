import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const proxy = async (request: NextRequest) => {
	const token = await getToken({ req: request });
	const { pathname } = request.nextUrl;

	const publicRoutes = ['/', '/sign-in', '/sign-up', '/verify'];

	if (token && publicRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	if (!token && pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}

	return NextResponse.next();
};

export const config = {
	matcher: [
		'/',
		'/sign-in',
		'/sign-up',
		'/verify/:path*',
		'/dashboard/:path*',
	],
};
