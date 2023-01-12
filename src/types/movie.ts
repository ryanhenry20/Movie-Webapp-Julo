export type contentType = {
	id: number;
	backdrop_path: string;
	name: string;
	title: string;
	poster_path: string;
	vote_average: number;
	vote_count: number;
	first_air_date: string;
	release_date: string;
	original_language: string;
	overview: string;
	media_type: string;
	tagline: string;
};

export type genres = {
	id: number;
	name?: string;
	filter?: () => void;
};
