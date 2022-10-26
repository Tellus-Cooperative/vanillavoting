import { Outlet } from '@remix-run/react';

export default function Proposals() {
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
							<a href="#" className="font-mono text-xl font-bold">
								home
							</a>
						</div>
						<div className="transition-all hover:skew-x-3 hover:rotate-3 hover:bg-telluscoopPink hover:text-telluscoopWhite">
							<a href="#" className="font-mono text-xl font-bold">
								community
							</a>
						</div>
						<div className="transition-all hover:skew-x-3 hover:rotate-3 hover:bg-telluscoopPink hover:text-telluscoopWhite">
							<a href="#" className="font-mono text-xl font-bold">
								docs
							</a>
						</div>
						<div className="transition-all hover:skew-x-3 hover:rotate-3 hover:bg-telluscoopPink hover:text-telluscoopWhite">
							<a href="#" className="font-mono text-xl font-bold">
								blog
							</a>
						</div>
					</div>
				</div>
				<div className="inline-block relative">
					<span className="absolute inset-0 z-0 bg-black translate-x-1 translate-y-1"></span>
					<button
						type="button"
						className="relative z-10 px-10 py-2 font-mono text-2xl border-4 border-black transition-all text-telluscoopWhite bg-telluscoopRed tracking-wide hover:bg-telluscoopGreen"
					>
						<a href="#">Connect Wallet</a>
					</button>
				</div>
			</nav>
			<Outlet />
		</div>
	);
}
