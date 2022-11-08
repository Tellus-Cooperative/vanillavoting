import { LoaderFunction } from '@remix-run/node';
import * as fs from 'fs/promises';

export const loader: LoaderFunction = async () => {
	const file = await fs.readFile('public/stellar.toml');

	return new Response(file, {
		status: 200,
		headers: {
			'Content-type': 'text/plain',
		},
	});
};
