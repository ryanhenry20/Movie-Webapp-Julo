import React from 'react';
import Search from 'Modules/Search/Search';
import SimpleBottomNavigation from 'components/MainNav';

const search: React.FC = () => {
	return (
		<>
			<Search></Search>
			<SimpleBottomNavigation></SimpleBottomNavigation>
		</>
	);
};

export default search;
