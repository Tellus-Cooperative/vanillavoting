import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { Outlet, useSubmit, useLoaderData, Link } from '@remix-run/react';
import albedo from '@albedo-link/intent';
import { createUserSession, getUser, logout } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
	const userKey = await getUser(request);
	const data = { userKey };

	return data;
};

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const sessionKey: any = body.get('pubkey');
	const userKey = await getUser(request);

	if (userKey !== null) {
		return logout(request);
	} else {
		return createUserSession(sessionKey, '/proposals');
	}
};

export default function Proposals() {
	const { userKey } = useLoaderData();
	const submit = useSubmit();

	const checkAlbedo = async () => {
		const pubKey = await albedo.publicKey({});
		const formData = new FormData();

		formData.set('pubkey', pubKey.pubkey);
		submit(formData, { method: 'post' });
	};

	const logoutAlbedo = async () => {
		submit(null, { method: 'post' });
	};

	const disconnectText = (e: any) => {
		e.target.innerText = 'Disconnect';
	};

	const originalText = (e: any) => {
		e.target.innerText = 'Connected';
	};

	return (
		<div className="flex flex-col mx-auto min-h-screen">
			<nav className="flex items-center justify-between p-10">
				<div className="flex flex-col">
					<div className="container flex items-center justify-center space-x-8">
						<img className="max-h-20" src="/assets/logo-web.png" alt="" />
						<div
							className="border-solid border-black border-l-4"
							style={{ height: '4.5rem' }}
						></div>
						<div className="flex flex-col items-center min-h-fit">
							<p className="font-mono text-2xl font-bold">community</p>
							<p className="font-mono text-5xl font-black tracking-tighter">
								VOTE!
							</p>
						</div>
					</div>
					<div className="flex justify-between mt-5">
						<div className="transition-all hover:skew-x-3 hover:rotate-3 hover:bg-telluscoopPink hover:text-telluscoopWhite">
							<a
								href="https://telluscoop.com"
								className="font-mono text-xl font-bold"
							>
								home
							</a>
						</div>
						<div className="transition-all hover:skew-x-3 hover:rotate-3 hover:bg-telluscoopPink hover:text-telluscoopWhite">
							<a
								href="https://community.telluscoop.com"
								className="font-mono text-xl font-bold"
							>
								community
							</a>
						</div>
						<div className="transition-all hover:skew-x-3 hover:rotate-3 hover:bg-telluscoopPink hover:text-telluscoopWhite">
							<a
								href="https://docs.telluscoop.com"
								className="font-mono text-xl font-bold"
							>
								docs
							</a>
						</div>
						<div className="transition-all hover:skew-x-3 hover:rotate-3 hover:bg-telluscoopPink hover:text-telluscoopWhite">
							<a
								href="https://medium.com/telluscoop"
								className="font-mono text-xl font-bold"
							>
								blog
							</a>
						</div>
					</div>
				</div>
				<div className="flex min-w-[25%] justify-between items-center">
					{userKey && (
						<Link
							to="/proposals/user"
							className="flex flex-col items-center mr-10"
						>
							<img
								className="max-w-[4rem]"
								src="/assets/user-logo.png"
								alt=""
							/>
							<span className="font-mono text-md mt-2">
								{userKey.slice(0, 4) + '...' + userKey.slice(-4)}
							</span>
						</Link>
					)}
					<div>
						<div className="inline-block relative">
							<span className="absolute inset-0 z-0 bg-black translate-x-1 translate-y-1"></span>
							{userKey ? (
								<button
									type="button"
									className="relative z-10 px-10 py-2 font-mono text-2xl border-4 border-black transition-all text-telluscoopWhite bg-telluscoopGreen tracking-wide hover:bg-telluscoopRed"
									onMouseEnter={disconnectText}
									onMouseLeave={originalText}
									onClick={logoutAlbedo}
								>
									Connected
								</button>
							) : (
								<button
									type="button"
									className="relative z-10 px-10 py-2 font-mono text-2xl border-4 border-black transition-all text-telluscoopWhite bg-telluscoopRed tracking-wide hover:bg-telluscoopGreen"
									onClick={checkAlbedo}
								>
									Connect Wallet
								</button>
							)}
						</div>
					</div>
				</div>
			</nav>
			<Outlet />
		</div>
	);
}
