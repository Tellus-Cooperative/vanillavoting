import type { MetaFunction, LinksFunction } from '@remix-run/node';
import styles from './tailwind.css';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: styles },
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz@8..144&family=Roboto+Mono&display=swap',
	},
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
];

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Tellus Cooperative',
	viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
