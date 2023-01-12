import { Chip } from '@material-ui/core';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface IGenres {
	genres: genres[] | never[];
	// setGenres: (t: NewType | {}) => void;
	setGenres: Dispatch<SetStateAction<never[] | genres[]>>;
	selectedGenres: genres[] | never[];
	// setSelectedGenres: (t: [...any[], []] | {}) => void;
	setSelectedGenres: Dispatch<SetStateAction<never[] | genres[]>>;
	type: string;
	setPage: (t: number) => void;
}

type genres = {
	id: number;
	name?: string;
	filter?: () => void;
};

const Genres: React.FC<IGenres> = ({
	selectedGenres,
	setSelectedGenres,
	genres,
	setGenres,
	type,
	setPage,
}) => {
	const handleAdd = (genre: genres) => {
		setSelectedGenres([...selectedGenres, genre]);
		setGenres(genres.filter((g: { id: number }) => g.id !== genre.id));
		setPage(1);
	};

	const handleRemove = (genre: { id: number }) => {
		setSelectedGenres(
			selectedGenres.filter(
				(selected: { id: number }) => selected.id !== genre.id
			)
		);
		setGenres([...genres, genre]);
		setPage(1);
	};

	const fetchGenres = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/genre/${type}/list?api_key=${'a6f1d6141ab79ab9c704ded6c2d00d37'}&language=en-US`
		);
		setGenres(data.genres);
	};

	useEffect(() => {
		fetchGenres();

		return () => {
			setGenres([]); // unmounting
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div style={{ padding: '6px 0' }}>
			{selectedGenres.map((genre: genres) => (
				<Chip
					style={{ margin: 2 }}
					label={genre.name}
					key={genre.id}
					color="primary"
					clickable
					size="small"
					onDelete={() => handleRemove(genre)}
				/>
			))}
			{genres.map(genre => (
				<Chip
					style={{ margin: 2 }}
					label={genre.name}
					key={genre.id}
					clickable
					size="small"
					onClick={() => handleAdd(genre)}
				/>
			))}
		</div>
	);
};

export default Genres;
