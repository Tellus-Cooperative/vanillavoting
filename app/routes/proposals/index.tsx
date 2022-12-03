import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { prisma } from '~/utils/prisma.server';
import { getUser } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
	const data = await prisma.proposals.findMany();
	const userKey = await getUser(request);
	const stellarYes = await fetch(
		'https://horizon-testnet.stellar.org/accounts/GALB22EZFMEDXZSK7QD4NGFFSRMV434ZSQL2O6KOY7YTYADYYUSJLDWE'
	);
	const coopYes = await stellarYes.json();
	const stellarNo = await fetch(
		'https://horizon-testnet.stellar.org/accounts/GDSXBUMPPPK54KZI2TQ3OY5DLBT6YDUFWR5RZTAZB3CU6PCJNSVPRXQQ'
	);
	const coopNo = await stellarNo.json();

	return { data, userKey, coopYes, coopNo };
};

export default function ProposalsIndex() {
	const { data, userKey, coopYes, coopNo } = useLoaderData();

	const today: any = new Date();

	const dayDifference = (a: any, b: any) => {
		const ms = 1000 * 60 * 60 * 24;
		const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

		return Math.floor((utc2 - utc1) / ms);
	};

	const dates = data.map((item: any) => {
		const dateEnd = new Date(item.endDate);

		return dayDifference(today, dateEnd);
	});

	const totalYes = coopYes.balances.find(
		(item: any) => item.asset_code === 'COOP'
	);

	const totalNo = coopNo.balances.find(
		(item: any) => item.asset_code === 'COOP'
	);

	const totalVotes = Math.trunc(totalYes.balance) + Math.trunc(totalNo.balance);
	const minVotes = data[0].minVotes;

	const percentage = (totalVotes / minVotes) * 100;
	const percentageStyle = {
		width: `${percentage}%`,
	};

	return (
		<div className="flex-1 flex flex-col py-5 px-10">
			<h1 className="font-flex text-2xl md:text-3xl mb-7">
				<img
					className="inline-block max-h-8 md:max-h-10 mb-2"
					src="/assets/vote.png"
				/>{' '}
				Community Governance Proposals (CGP)
			</h1>
			<ul className="flex space-x-7 md:space-x-10 font-flex text-lg mb-3 pl-1">
				<li className="text-telluscoopRed hover:cursor-pointer">All</li>
				<li className="hover:text-telluscoopRed hover:cursor-pointer">
					Active
				</li>
				<li className="hover:text-telluscoopRed hover:cursor-pointer">
					Passed
				</li>
				<li className="hover:text-telluscoopRed hover:cursor-pointer">
					Rejected
				</li>
			</ul>
			<div className="border-black border-[3px] rounded">
				<table className="table-fixed w-full">
					<tbody>
						{data.map((item: any, index: number) => (
							<tr
								key={item.id}
								className={
									item.tag === 'active'
										? 'bg-telluscoopLightGreen'
										: item.tag === 'rejected'
										? 'bg-telluscoopLightRed'
										: 'bg-telluscoopLightGray'
								}
							>
								<td className="flex flex-col md:flex-row px-5 py-3 justify-between items-center md:items-stretch">
									<div className="flex flex-col md:w-[70%] mb-8 md:mb-0">
										<div className="flex items-center mb-2">
											<h2 className="font-flex text-xl font-bold tracking-wide mr-5">
												{item.proposal}
											</h2>
											<span className="font-flex text-sm italic tracking-wide">
												{dates[index] > 1
													? dates[index] + ' days left'
													: dates[index] + ' day left'}
											</span>
										</div>
										<div>
											<p className="font-flex text-base">{item.description}</p>
										</div>
									</div>
									<div className="flex pr-6 md:pr-0 mb-2 md:mb-0">
										<div className="flex items-end pr-2">
											<span className="font-flex text-xs font-bold">{`${percentage}%`}</span>
										</div>
										<div className="flex flex-col items-center justify-between pt-1">
											{userKey ? (
												<Link to={item.id}>
													<div className="inline-block relative">
														<span className="absolute inset-0 z-0 bg-black translate-x-0.5 translate-y-0.5 rounded"></span>
														<button
															type="button"
															className="relative z-10 px-8 py-1 font-mono text-2xl border-4 border-black transition-all text-telluscoopWhite bg-telluscoopGreen tracking-wide rounded hover:bg-telluscoopPink"
														>
															VOTE
														</button>
													</div>
												</Link>
											) : (
												<div>
													<div className="inline-block relative">
														<span className="absolute inset-0 z-0 bg-black translate-x-0.5 translate-y-0.5 rounded"></span>
														<button
															type="button"
															className="relative z-10 px-8 py-1 font-mono text-2xl border-4 border-black transition-all text-stone-700 bg-gray-400 tracking-wide rounded cursor-default"
														>
															VOTE
														</button>
													</div>
												</div>
											)}

											<div className="w-full mt-3 relative h-3 mb-0.5">
												<div className="bg-neutral-500 absolute top-0 left-0 h-3 w-full rounded border-2 border-black"></div>
												<div
													className="bg-telluscoopYellow absolute top-0 left-0 h-3 rounded border-2 border-black"
													style={percentageStyle}
												></div>
											</div>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
