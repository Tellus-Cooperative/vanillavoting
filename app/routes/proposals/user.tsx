import { Link, useLoaderData } from '@remix-run/react';
import { redirect, LoaderFunction } from '@remix-run/node';
import { getUser } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
	const userKey = await getUser(request);
	const stellarAccount = await fetch(
		'https://horizon.stellar.org/accounts/GCTLGFMM2KFVGJDBVAWYCFK3P22MNG2O3MS6K6LCH5CLPW45TVCJSZU2' //+ userKey
	);
	const stellarAccountData = await stellarAccount.json();
	const stellarClaimable = await fetch(
		'https://horizon.stellar.org/claimable_balances?claimant=GCTLGFMM2KFVGJDBVAWYCFK3P22MNG2O3MS6K6LCH5CLPW45TVCJSZU2'
	); //+ userKey
	const stellarClaimableData = await stellarClaimable.json();

	if (!userKey) {
		return redirect('/proposals');
	}

	return { userKey, stellarAccountData, stellarClaimableData };
};

export default function User() {
	const { userKey, stellarAccountData, stellarClaimableData } = useLoaderData();

	const xlm = stellarAccountData.balances.find(
		(item: any) => item.asset_type === 'native'
	);
	const coop = stellarAccountData.balances.find(
		(item: any) => item.asset_code === 'COOP'
	);
	const signers = stellarAccountData.signers.map((item: any) => item);
	const claimables = stellarClaimableData['_embedded'].records
		.map((item: any) => [
			item.id,
			item.asset.slice(0, item.asset.indexOf(':')),
			Math.trunc(item.amount),
		])
		.sort();

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
				<div className="basis-1/2 border-black border-[3px] rounded p-7 bg-neutral-300">
					<div className="mb-8">
						<h3 className="inline-block font-flex text-base font-bold mr-2">
							Account Balance
						</h3>
						{/* <span className="inline-block font-flex text-base">~ 4000 USD</span> */}
					</div>
					<h4 className="font-flex text-base mb-2">
						XLM: {Math.trunc(xlm.balance)}
						{/*  ~ 100 USD */}
					</h4>
					<h4 className="font-flex text-base mb-8">
						COOP: {coop ? Math.trunc(coop.balance) : 0}
						{/*  ~ 20 USD */}
					</h4>
					<h3 className="font-flex text-base font-bold mb-4">
						Pending Claimable Balances
					</h3>
					<div className="max-h-[10rem] overflow-y-scroll">
						{claimables.map((item: any) => (
							<h4 key={item[0]} className="font-flex text-base mb-2">
								{`${item[1]}: ${item[2]}`}
							</h4>
						))}
					</div>
				</div>
				<div className="basis-1/2 border-black border-[3px] rounded p-7 bg-neutral-300">
					<h3 className="font-flex text-base font-bold mb-1">
						Account Signers
					</h3>
					{signers.map((item: any) => (
						<h4 key={item.key} className="font-flex text-base mb-2">
							{item.key}
						</h4>
					))}
				</div>
			</div>
		</div>
	);
}
