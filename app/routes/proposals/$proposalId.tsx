import { redirect, LoaderFunction } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { prisma } from '~/utils/prisma.server';
import { getUser } from '~/utils/session.server';
import albedo from '@albedo-link/intent';

export const loader: LoaderFunction = async ({ request, params }) => {
	const userKey = await getUser(request);
	const data = await prisma.proposals.findUnique({
		where: { id: params.proposalId },
	});
	const stellarYes = await fetch(
		'https://horizon-testnet.stellar.org/accounts/GALB22EZFMEDXZSK7QD4NGFFSRMV434ZSQL2O6KOY7YTYADYYUSJLDWE'
	);
	const coopYes = await stellarYes.json();
	const stellarNo = await fetch(
		'https://horizon-testnet.stellar.org/accounts/GDSXBUMPPPK54KZI2TQ3OY5DLBT6YDUFWR5RZTAZB3CU6PCJNSVPRXQQ'
	);
	const coopNo = await stellarNo.json();

	if (!userKey) {
		return redirect('/proposals');
	}

	return { data, coopYes, coopNo, userKey };
};

export default function Proposals() {
	const { data, coopYes, coopNo, userKey } = useLoaderData();

	const dateStart = new Date(data.startDate);
	const dateEnd = new Date(data.endDate);

	const totalYes = coopYes.balances.find(
		(item: any) => item.asset_code === 'COOP'
	);

	const totalNo = coopNo.balances.find(
		(item: any) => item.asset_code === 'COOP'
	);

	const totalVotes = Math.trunc(totalYes.balance) + Math.trunc(totalNo.balance);
	const minVotes = data.minVotes;

	const percentageTotal = (totalVotes / minVotes) * 100;
	const percentageTotalStyle = {
		width: `${percentageTotal}%`,
	};

	const percentageYes = (totalYes.balance / minVotes) * 100;
	const percentageYesStyle = {
		width: `${percentageYes}%`,
	};

	const percentageNo = (totalNo.balance / minVotes) * 100;
	const percentageNoStyle = {
		width: `${percentageNo}%`,
	};

	type TxData = {
		amount: string;
		destination: string;
		asset_code: string;
		asset_issuer: string;
		network: string;
		submit: boolean;
	};

	const voteYes = async () => {
		const txData: TxData = {
			amount: '500',
			destination: 'GALB22EZFMEDXZSK7QD4NGFFSRMV434ZSQL2O6KOY7YTYADYYUSJLDWE',
			asset_code: 'COOP',
			asset_issuer: 'GBE2GUDSJCZW5GGXDS3V3VQV3SEIN67UR6Z64P2CETVJ2O2CPGBRIVF3',
			network: 'testnet',
			submit: true,
		};
		const tx = await albedo.pay(txData);
		window.location.reload();
	};

	const voteNo = async () => {
		const txData: TxData = {
			amount: '500',
			destination: 'GDSXBUMPPPK54KZI2TQ3OY5DLBT6YDUFWR5RZTAZB3CU6PCJNSVPRXQQ',
			asset_code: 'COOP',
			asset_issuer: 'GBE2GUDSJCZW5GGXDS3V3VQV3SEIN67UR6Z64P2CETVJ2O2CPGBRIVF3',
			network: 'testnet',
			submit: true,
		};
		const tx = await albedo.pay(txData);
		window.location.reload();
	};

	return (
		<div className="flex-1 flex flex-col py-5 px-10">
			<Link to="/proposals" className="font-flex text-lg mb-2">
				Back
			</Link>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center mb-3">
					<h1 className="font-flex text-4xl mr-5">Selected {data.proposal}</h1>
					<span className="font-flex text-sm">
						{dateEnd.toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</span>
				</div>
				<div className="basis-1/3 flex flex-col items-end pl-1">
					<span className="font-mono text-sm italic font-bold">
						Treasury Quorum
					</span>
					<div className="w-full mt-1 relative h-3">
						<div className="bg-neutral-500 absolute top-0 left-0 h-3 w-full rounded border-2 border-black"></div>
						<div
							className="bg-telluscoopYellow absolute top-0 left-0 h-3 rounded border-2 border-black"
							style={percentageTotalStyle}
						></div>
					</div>
				</div>
			</div>
			<div className="flex space-x-2 min-h-[50vh]">
				<div className="basis-2/3 border-black border-[3px] rounded p-7 bg-neutral-300">
					<div className="mb-2">
						<h3 className="font-flex text-base font-bold mb-2">Abstract</h3>
						<p className="mb-6">{data.abstract}</p>
						<h3 className="font-flex text-base font-bold mb-2">Body</h3>
					</div>
					<div className="max-h-[8rem] overflow-y-scroll">
						<p>{data.body}</p>
					</div>
				</div>
				<div className="basis-1/3 flex flex-col">
					<div className="basis-[55%] flex flex-col border-black border-[3px] rounded p-7 bg-neutral-300 mb-2">
						<div className="mb-4">
							<h3 className="font-flex font-bold text-lg tracking-wide">
								VOTING
							</h3>
							<p className="font-flex text-sm">Do you approve this proposal?</p>
						</div>
						<div className="flex items-center mb-2">
							<div className="">
								<div className="inline-block relative">
									<span className="absolute inset-0 z-0 bg-black translate-x-0.5 translate-y-0.5 rounded"></span>
									<button
										type="button"
										className="relative z-10 px-[1.8rem] py-0.5 font-mono text-lg border-4 border-black transition-all text-telluscoopWhite bg-telluscoopBlue tracking-wide rounded hover:bg-telluscoopGreen"
										onClick={voteYes}
									>
										YES
									</button>
								</div>
							</div>
							<div className="flex-1 flex flex-col items-end justify-center pl-2">
								<span className="font-mono text-xs italic font-bold">
									{`${Math.trunc(totalYes.balance)} COOP ${percentageYes}%`}
								</span>
								<div className="w-full relative h-3 mb-4">
									<div className="bg-neutral-500 absolute top-0 left-0 h-3 w-full rounded border-2 border-black"></div>
									<div
										className="bg-telluscoopBlue absolute top-0 left-0 h-3 rounded border-2 border-black"
										style={percentageYesStyle}
									></div>
								</div>
							</div>
						</div>
						<div className="flex items-center">
							<div>
								<div className="inline-block relative">
									<span className="absolute inset-0 z-0 bg-black translate-x-0.5 translate-y-0.5 rounded"></span>
									<button
										type="button"
										className="relative z-10 px-[2.15rem] py-0.5 font-mono text-lg border-4 border-black transition-all text-telluscoopWhite bg-telluscoopPink tracking-wide rounded hover:bg-telluscoopGreen"
										onClick={voteNo}
									>
										NO
									</button>
								</div>
							</div>
							<div className="flex-1 flex flex-col items-end justify-center pl-2">
								<span className="font-mono text-xs italic font-bold">
									{`${Math.trunc(totalNo.balance)} COOP ${percentageNo}%`}
								</span>
								<div className="w-full relative h-3 mb-4">
									<div className="bg-neutral-500 absolute top-0 left-0 h-3 w-full rounded border-2 border-black"></div>
									<div
										className="bg-telluscoopPink absolute top-0 left-0 h-3 rounded border-2 border-black"
										style={percentageNoStyle}
									></div>
								</div>
							</div>
						</div>
					</div>
					<div className="basis-[45%] border-black border-[3px] rounded p-7 bg-neutral-300">
						<div>
							<h3 className="font-flex text-base font-bold mb-1 inline-block">
								Start date:
							</h3>{' '}
							<span className="inline-block font-flex text-base">
								{dateStart.toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
						</div>
						<div>
							<h3 className="font-flex text-base font-bold mb-1 inline-block">
								End date:
							</h3>{' '}
							<span className="inline-block font-flex text-base">
								{dateEnd.toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
						</div>
						<a href={data.link}>
							<h3 className="font-flex text-base font-bold mb-1 underline">
								Community Post
							</h3>
						</a>
						<a href={data.address}>
							<h3 className="font-flex text-base font-bold mb-1 underline">
								Address
							</h3>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
