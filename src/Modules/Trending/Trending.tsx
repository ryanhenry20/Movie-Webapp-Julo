// import "./Trending.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import SingleContent from 'components/SingleContent/SingleContent';
import CustomPagination from 'components/Pagination/CustomPagination';
import { contentType } from 'types/movie';

const Trending: React.FC = () => {
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${'a6f1d6141ab79ab9c704ded6c2d00d37'}&page=${page}`
		);

		setContent(data.results);
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchTrending();
		// eslint-disable-next-line
	}, [page]);

	return (
		<Wrapper>
			<span className="pageTitle">Trending Today</span>
			<WrapperContent>
				{content &&
					content.map((c: contentType) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={c.media_type}
							vote_average={c.vote_average}
						/>
					))}
			</WrapperContent>
			<CustomPagination setPage={setPage} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-left: 24px;
	margin-right: 24px;
`;

const WrapperContent = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`;

export default Trending;
