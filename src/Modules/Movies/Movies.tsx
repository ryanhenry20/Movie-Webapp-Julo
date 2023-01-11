import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Genres from 'components/Genres/Genres';
import SingleContent from 'components/SingleContent/SingleContent';
import useGenre from 'hooks/useGenre';
import CustomPagination from 'components/Pagination/CustomPagination';
import { contentType, genres } from 'types/movie';

const Movies = () => {
	const [genres, setGenres] = useState<genres[] | never[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<genres[] | never[]>([]);
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState(0);
	const genreforURL = useGenre(selectedGenres);
	// console.log(selectedGenres);

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${'a6f1d6141ab79ab9c704ded6c2d00d37'}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
		);
		setContent(data.results);
		setNumOfPages(data.total_pages);
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchMovies();
		// eslint-disable-next-line
	}, [genreforURL, page]);

	return (
		<div>
			<span className="pageTitle">Discover Movies</span>
			<Genres
				type="movie"
				selectedGenres={selectedGenres}
				setGenres={setGenres}
				setSelectedGenres={setSelectedGenres}
				genres={genres}
				setPage={setPage}
			/>
			<WrapperContent className="trending">
				{content &&
					content.map((c: contentType) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type="movie"
							vote_average={c.vote_average}
						/>
					))}
			</WrapperContent>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	);
};

const WrapperContent = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`;

export default Movies;
