import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './app.css';

const theme = createMuiTheme({
	palette: {
		background: {
			default: '#EEE',
		},
		primary: {
			main: '#673ab7',
		},
	},
});

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			const axe = require('react-axe');
			axe(React, ReactDOM, 1000);
		}

		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Movie App</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline>
					<div className="app">
						<Component {...pageProps} />
					</div>
				</CssBaseline>
			</ThemeProvider>
		</>
	);
};

export default MyApp;
