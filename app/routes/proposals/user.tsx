import { Link, useLoaderData } from '@remix-run/react';
import { redirect, LoaderFunction } from '@remix-run/node';
import { getUser } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
	const userKey = await getUser(request);
	const data = { userKey };

	if (!userKey) {
		return redirect('/proposals');
	}

	return data;
};

export default function User() {
	const { userKey } = useLoaderData();

	return (
		<div className="flex-1 flex flex-col py-5 px-10">
			<Link to="/proposals" className="font-flex text-lg mb-2">
				Back
			</Link>
			<div className="flex items-center mb-5">
				<h1 className="font-flex text-4xl mr-5">My Account</h1>
				<span className="font-flex text-sm pt-1">
					{userKey.slice(0, 4) + '...' + userKey.slice(-4)}
				</span>
			</div>
			<div className="flex space-x-2 min-h-[50vh]">
				<div className="basis-2/3 border-black border-[3px] rounded p-7 bg-neutral-300">
					<div className="mb-8">
						<h3 className="inline-block font-flex text-base font-bold mr-2">
							Account Balance
						</h3>
						<span className="inline-block font-flex text-base">~ 4000 USD</span>
					</div>
					<h4 className="font-flex text-base mb-2">XLM: 100000 ~ 100 USD</h4>
					<h4 className="font-flex text-base mb-8">COOP: 100000 ~ 20 USD</h4>
					<h3 className="font-flex text-base font-bold">
						Pending Claimable Balances
					</h3>
				</div>
				<div className="basis-1/3 border-black border-[3px] rounded p-7 bg-neutral-300">
					<h3 className="font-flex text-base font-bold mb-1">Created</h3>
					<h4 className="font-flex text-base mb-2">placeholder</h4>
					<h3 className="font-flex text-base font-bold mb-1">Created by</h3>
					<h4 className="font-flex text-base mb-2">placeholder</h4>
					<h3 className="font-flex text-base font-bold mb-1">
						Account Signers
					</h3>
					<h4 className="font-flex text-base mb-2">placeholder</h4>
				</div>
			</div>
		</div>
	);
}
