export default function Index() {
	return (
		<div className="flex flex-col mx-auto min-h-screen items-center">
			<nav className="container p-6">
				<div className="flex items-center justify-end">
					<div className="flex space-x-8">
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
			</nav>
			<section className="my-10">
				<div className="container flex items-center justify-center space-x-8">
					<img className="max-w-md" src="/assets/logo-web.png" alt="" />
					<div
						className="border-solid border-black border-l-4"
						style={{ height: '7.5rem' }}
					></div>
					<div className="flex flex-col items-center min-h-fit">
						<p className="font-mono text-4xl font-bold">community</p>
						<p className="font-mono text-7xl font-black tracking-tighter">
							VOTE!
						</p>
					</div>
				</div>
			</section>
			<section className="flex-1 flex flex-col items-center bg-landing bg-no-repeat bg-bottom bg-custom min-w-full">
				<div className="flex flex-col items-center mb-12">
					<p className="font-mono text-2xl">
						You can vote on the community proposals with most votes now!
					</p>
					<p className="font-mono text-2xl">
						Let's shape the future of sustainable and decentralized
					</p>
					<p className="font-mono text-2xl">economies together.</p>
				</div>
				<div className="mb-20">
					<div className="inline-block relative">
						<span className="absolute inset-0 z-0 bg-black translate-x-1 translate-y-1"></span>
						<button
							type="button"
							className="relative z-10 px-10 py-2 font-mono text-3xl border-4 border-black transition-all text-telluscoopWhite bg-telluscoopGreen tracking-wide hover:bg-telluscoopRed hover:-rotate-3"
						>
							<a href="#">VOTE!</a>
						</button>
					</div>
				</div>
				<div className="flex items-center justify-evenly min-w-full">
					<div className="inline-block relative">
						<span className="absolute inset-0 z-0 bg-black translate-x-1 translate-y-1 rounded-full -mt-24"></span>
						<div className="flex flex-col relative z-10 items-center justify-center w-[160px] h-[160px] border-4 border-black rounded-full -mt-24 bg-telluscoopBlue">
							<p className="font-mono text-xl tracking-wide font-medium">
								COOP
							</p>
							<p className="font-mono text-xl tracking-wide font-medium">
								Token
							</p>
						</div>
					</div>
					<div className="inline-block relative">
						<span className="absolute inset-0 z-0 bg-black translate-x-1 translate-y-1 rounded-full"></span>
						<div className="flex flex-col relative z-10 items-center justify-center w-[160px] h-[160px] border-4 border-black rounded-full bg-telluscoopYellow">
							<p className="font-mono text-xl tracking-wide font-medium">
								Mission
							</p>
						</div>
					</div>
					<div className="inline-block relative">
						<span className="absolute inset-0 z-0 bg-black translate-x-1 translate-y-1 rounded-full -mt-24"></span>
						<div className="flex flex-col relative z-10 items-center justify-center w-[160px] h-[160px] border-4 border-black rounded-full -mt-24 bg-telluscoopPink">
							<p className="font-mono text-xl tracking-wide font-medium">
								Roadmap
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
