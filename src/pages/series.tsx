import React from 'react';
import Series from 'Modules/Series/Series';
import SimpleBottomNavigation from 'components/MainNav';

const series: React.FC = () => {
	return (
		<>
			<Series></Series>
			<SimpleBottomNavigation></SimpleBottomNavigation>
		</>
	);
};

export default series;
