import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TvIcon from '@material-ui/icons/Tv';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { useRouter } from 'next/router';
// import { useHistory } from "react-router-dom";

interface ISimpleBottomNavigation {
	value: number;
	setValue: (t: number) => void;
}

const useStyles = makeStyles({
	root: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		backgroundColor: '#2d313a',
		zIndex: 100,
	},
});

export default function SimpleBottomNavigation() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	// const history = useHistory();
	const router = useRouter();

	const handleChange = (newValue: number) => {
		setValue(newValue);
		if (newValue === 0) {
			router.push('/');
		} else if (newValue === 1) {
			router.push('/movies');
		} else if (newValue === 2) {
			router.push('/series');
		} else if (newValue === 3) {
			router.push('/search');
		}
	};

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				handleChange(newValue);
			}}
			showLabels
			className={classes.root}>
			<BottomNavigationAction
				style={{ color: 'white' }}
				label="Trending"
				icon={<WhatshotIcon />}
			/>
			<BottomNavigationAction
				style={{ color: 'white' }}
				label="Movies"
				icon={<MovieIcon />}
			/>
			<BottomNavigationAction
				style={{ color: 'white' }}
				label="TV Series"
				icon={<TvIcon />}
			/>
			<BottomNavigationAction
				style={{ color: 'white' }}
				label="Search"
				icon={<SearchIcon />}
			/>
		</BottomNavigation>
	);
}
