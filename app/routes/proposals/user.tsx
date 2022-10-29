import { Link } from '@remix-run/react';
import { redirect, LoaderFunction } from '@remix-run/node';
import { getUser } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
	const userKey = await getUser(request);

	if (!userKey) {
		return redirect('/proposals');
	}

	return null;
};

export default function User() {
	return (
		<div className="flex-1 flex flex-col py-5 px-10">
			<Link to="/proposals" className="font-flex text-lg mb-7">
				Back
			</Link>
			<h1 className="font-flex text-3xl mb-3">My Account</h1>
		</div>
	);
}
