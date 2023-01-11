import React from 'react';
import Trending from 'Modules/Trending/Trending';
import SimpleBottomNavigation from 'components/MainNav';

const trending: React.FC = () => {
	return (
		<>
			<Trending></Trending>
			<SimpleBottomNavigation></SimpleBottomNavigation>
		</>
	);
};

export default trending;
