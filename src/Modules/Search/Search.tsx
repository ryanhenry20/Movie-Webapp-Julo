import {
	Button,
	createMuiTheme,
	Tab,
	Tabs,
	TextField,
	ThemeProvider,
} from '@material-ui/core';
import styled from '@emotion/styled';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomPagination from 'components/Pagination/CustomPagination';
import SingleContent from 'components/SingleContent/SingleContent';
import { contentType } from 'types/movie';

const Search = () => {
	const [type, setType] = useState(0);
	const [searchText, setSearchText] = useState('');
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState(0);

	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
			primary: {
				main: '#fff',
			},
		},
	});

	const fetchSearch = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/search/${
					type ? 'tv' : 'movie'
				}?api_key=${'a6f1d6141ab79ab9c704ded6c2d00d37'}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
			);
			setContent(data.results);
			setNumOfPages(data.total_pages);
			// console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchSearch();
		// eslint-disable-next-line
	}, [type, page]);

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<Wrapper className="search">
					<TextField
						style={{ flex: 1 }}
						className="searchBox"
						label="Search"
						variant="filled"
						onChange={e => setSearchText(e.target.value)}
					/>
					<Button
						onClick={fetchSearch}
						variant="contained"
						style={{ marginLeft: 10 }}>
						<SearchIcon fontSize="large" />
					</Button>
				</Wrapper>
				<Tabs
					value={type}
					indicatorColor="primary"
					textColor="primary"
					onChange={(event, newValue) => {
						setType(newValue);
						setPage(1);
					}}
					style={{ paddingBottom: 5 }}
					aria-label="disabled tabs example">
					<Tab style={{ width: '50%' }} label="Search Movies" />
					<Tab style={{ width: '50%' }} label="Search TV Series" />
				</Tabs>
			</ThemeProvider>
			<WrapperContent>
				{content &&
					content.map((c: contentType) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={type ? 'tv' : 'movie'}
							vote_average={c.vote_average}
						/>
					))}
				{searchText &&
					!content &&
					(type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
			</WrapperContent>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	);
};

const Wrapper = styled.div`
	display: flex;
	margin: 15px 24px 15px 24px;
`;

const WrapperContent = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`;

export default Search;
