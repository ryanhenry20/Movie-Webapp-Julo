import React from 'react';
import Movies from 'Modules/Movies/Movies';
import SimpleBottomNavigation from 'components/MainNav';

const movies: React.FC = () => {
	return (
		<>
			<Movies></Movies>
			<SimpleBottomNavigation></SimpleBottomNavigation>
		</>
	);
};

export default movies;
