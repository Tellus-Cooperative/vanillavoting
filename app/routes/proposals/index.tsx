import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO as string, { dbName: 'tellus-app' });

const ProposalSchema = new mongoose.Schema(
	{
		proposal: String,
		description: String,
		startDate: Date,
		abstract: String,
		address: String,
		body: String,
		endDate: Date,
		link: String,
		minVotes: Number,
	},
	{ collection: 'proposals' }
);

const ProposalModel: any =
	mongoose.models['Proposal'] || mongoose.model('Proposal', ProposalSchema);

export const loader: LoaderFunction = async () => {
	const data = await ProposalModel.find({});

	return { data };
};

export default function ProposalsIndex() {
	const { data } = useLoaderData();

	return (
		<div className="flex-1 flex flex-col py-5 px-10">
			<h1 className="font-flex text-3xl mb-7">
				<img className="inline-block max-h-10 mb-2" src="/assets/vote.png" />{' '}
				Community Governance Proposals (CGP)
			</h1>
			<ul className="flex space-x-10 font-flex text-lg mb-3 pl-1">
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
						{data.map((item: any) => (
							<tr
								key={item._id}
								className={
									item.tag === 'active'
										? 'bg-telluscoopLightGreen'
										: item.tag === 'rejected'
										? 'bg-telluscoopLightRed'
										: 'bg-telluscoopLightGray'
								}
							>
								<td className="flex px-5 py-3 justify-between">
									<div className="flex flex-col w-[70%]">
										<div className="flex items-center mb-2">
											<h2 className="font-flex text-xl font-bold tracking-wide mr-5">
												Proposal {'#' + item.proposal.slice(-3)}
											</h2>
											<span className="font-flex text-sm italic tracking-wide">
												5 days left
											</span>
										</div>
										<div>
											<p className="font-flex text-base">{item.description}</p>
										</div>
									</div>
									<div className="flex">
										<div className="flex items-end pr-2">
											<span className="font-flex text-xs font-bold">50%</span>
										</div>
										<div className="flex flex-col items-center justify-between pt-1">
											<div className="inline-block relative">
												<span className="absolute inset-0 z-0 bg-black translate-x-0.5 translate-y-0.5 rounded"></span>
												<button
													type="button"
													className="relative z-10 px-8 py-1 font-mono text-2xl border-4 border-black transition-all text-telluscoopWhite bg-telluscoopGreen tracking-wide rounded hover:bg-telluscoopPink"
												>
													VOTE
												</button>
											</div>
											<div className="w-full mt-3 relative h-3 mb-0.5">
												<div className="bg-neutral-500 absolute top-0 left-0 h-3 w-full rounded border-2 border-black"></div>
												<div className="bg-telluscoopYellow absolute top-0 left-0 h-3 w-[50%] rounded border-2 border-black"></div>
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
