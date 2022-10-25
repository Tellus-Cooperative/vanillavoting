/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{ts,tsx}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		backgroundSize: {
			custom: '75%',
		},
		extend: {
			colors: {
				telluscoopWhite: '#F9F9F9',
				telluscoopPink: '#FF6392',
				telluscoopYellow: '#FFE45E',
				telluscoopRed: '#DD211E',
				telluscoopBlue: '#5AA9E6',
				telluscoopGreen: '#71C666',
				telluscoopDark: '#22333F',
			},
			fontFamily: {
				roboto: ["'Roboto Mono'", "'monospace'"],
				flex: ["'Roboto Flex'", 'sans-serif'],
			},
			backgroundImage: {
				landing: "url('/assets/bg-landing.png')",
			},
		},
	},
	plugins: [],
};
