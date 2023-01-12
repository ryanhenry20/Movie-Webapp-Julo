import React, { Dispatch, SetStateAction } from 'react';
import { Pagination } from '@mui/material';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

interface ICustomPagination {
	setPage: Dispatch<SetStateAction<number>>;
	numOfPages?: number;
}

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
});

function CustomPagination({ setPage, numOfPages = 10 }: ICustomPagination) {
	// Scroll to top when page changes
	const handlePageChange = (page: number) => {
		setPage(page);
		window.scroll(0, 0);
	};

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				marginTop: 10,
			}}>
			<ThemeProvider theme={darkTheme}>
				<Pagination
					onChange={(e: any) => handlePageChange(e.target?.textContent)}
					count={numOfPages}
					color="primary"
					hideNextButton
					hidePrevButton
				/>
			</ThemeProvider>
		</div>
	);
}

export default CustomPagination;
