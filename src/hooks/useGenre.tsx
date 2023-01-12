type genres = {
	id: number;
	name?: string;
	filter?: () => void;
};

const useGenre = (selectedGenres: genres[] | never[]) => {
	if (selectedGenres.length < 1) return '';

	const GenreIds = selectedGenres.map((g: { id: number | string }) => g.id);
	return GenreIds.reduce((acc, curr) => acc + ',' + curr);
};

export default useGenre;
