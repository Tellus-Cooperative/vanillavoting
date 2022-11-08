import { LoaderFunction } from '@remix-run/node';
import { readFileSync } from 'fs';
import path from 'path';

export const loader: LoaderFunction = async () => {
	const link = path.join(process.cwd(), 'public', 'stellar.toml');
	const file = readFileSync(link);

	return new Response(file, {
		status: 200,
		headers: {
			'Content-type': 'text/plain',
			'Access-Control-Allow-Origin': 'https://cooperate.telluscoop.com/',
		},
	});
};
