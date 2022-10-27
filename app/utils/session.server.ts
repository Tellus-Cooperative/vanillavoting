import { createCookieSessionStorage, redirect } from '@remix-run/node';

const storage = createCookieSessionStorage({
	cookie: {
		name: 'albedo_session',
		secure: true,
		secrets: ['tcoop'],
		sameSite: 'lax',
		path: '/proposals',
		maxAge: 60 * 60 * 24,
		httpOnly: true,
	},
});

export async function createUserSession(pubKey: string, redirectTo: string) {
	const session = await storage.getSession();
	session.set('pubkey', pubKey);
	return redirect(redirectTo, {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	});
}

export function getUserSession(request: Request) {
	return storage.getSession(request.headers.get('Cookie'));
}

export async function getUser(request: Request) {
	const session = await getUserSession(request);
	const pubKey = session.get('pubkey');
	if (!pubKey || typeof pubKey !== 'string') {
		return null;
	}
}
