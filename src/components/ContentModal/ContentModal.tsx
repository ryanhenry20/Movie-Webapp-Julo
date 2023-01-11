import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import {
	img_500,
	unavailable,
	unavailableLandscape,
} from '../../config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Carousel from '../Carousel/Carousel';
import { contentType } from 'types/movie';

interface IContentModal {
	id: number;
	media_type: string;
	children: React.ReactNode;
}

// type content = {
// 	backdrop_path: string;
// 	name: string;
// 	title: string;
// 	poster_path: string;
// 	vote_average: number;
// 	vote_count: number;
// 	first_air_date: string;
// 	release_date: string;
// 	original_language: string;
// 	overview: string;
// 	tagline: string;
// };

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '90%',
		height: '80%',
		backgroundColor: '#39445a',
		border: '1px solid #282c34',
		borderRadius: 10,
		color: 'white',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 3),
	},
}));

function TransitionsModal({ children, media_type, id }: IContentModal) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState<contentType>();
	const [video, setVideo] = useState();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${'a6f1d6141ab79ab9c704ded6c2d00d37'}&language=en-US`
		);

		setContent(data);
		// console.log(data);
	};

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${'a6f1d6141ab79ab9c704ded6c2d00d37'}&language=en-US`
		);

		setVideo(data.results[0]?.key);
	};

	useEffect(() => {
		fetchData();
		fetchVideo();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<MediaWrapper
				className="media"
				style={{ cursor: 'pointer' }}
				color="inherit"
				onClick={handleOpen}>
				{children}
			</MediaWrapper>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					{content && (
						<Wrapper className={classes.paper}>
							<div className="ContentModal">
								<img
									src={
										content.poster_path
											? `${img_500}/${content.poster_path}`
											: unavailable
									}
									alt={content.name || content.title}
									className="ContentModal__portrait"
								/>
								<img
									src={
										content.backdrop_path
											? `${img_500}/${content.backdrop_path}`
											: unavailableLandscape
									}
									alt={content.name || content.title}
									className="ContentModal__landscape"
								/>
								<div className="ContentModal__about">
									<span className="ContentModal__title">
										{content.name || content.title} (
										{(
											content.first_air_date ||
											content.release_date ||
											'-----'
										).substring(0, 4)}
										)
									</span>
									{content.tagline && (
										<i className="tagline">{content.tagline}</i>
									)}

									<span className="ContentModal__description">
										{content.overview}
									</span>

									<div>
										<Carousel id={id} media_type={media_type} />
									</div>

									<Button
										variant="contained"
										startIcon={<YouTubeIcon />}
										color="secondary"
										target="__blank"
										href={`https://www.youtube.com/watch?v=${video}`}>
										Watch the Trailer
									</Button>
								</div>
							</div>
						</Wrapper>
					)}
				</Fade>
			</Modal>
		</>
	);
}

const MediaWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 200px;
	padding: 5px;
	margin: 5px 0;
	background-color: #282c34;
	border-radius: 10px;
	position: relative;
	font-family: 'Montserrat', sans-serif;

	&:hover {
		background-color: white;
		color: black;
	}

	@media (max-width: 550px) {
		width: 46%;
	}
`;

const Wrapper = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

	.ContentModal__landscape {
		object-fit: contain;
		border-radius: 10px;
	}

	.ContentModal__portrait {
		display: none;
		object-fit: contain;
		border-radius: 10px;
	}

	.tagline {
		padding-bottom: 10px;
		align-self: center;
	}

	.ContentModal {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 100%;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	.ContentModal::-webkit-scrollbar {
		display: none;
	}

	.ContentModal__about {
		padding: 10px;
		width: 95%;
		height: 90%;
		display: flex;
		flex-direction: column;
		font-family: 'Roboto', sans-serif;
		justify-content: space-evenly;
		font-weight: 300;
	}

	.ContentModal__title {
		height: 12%;
		font-size: 5vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ContentModal__description {
		display: flex;
		height: 40%;
		overflow-y: scroll;
		padding: 15px;
		border-radius: 20px;
		scrollbar-width: thin; /* Firefox */
		box-shadow: inset 0 0 5px #000000;
		text-align: justify;
	}

	.ContentModal__description::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: 835px) {
		.ContentModal__landscape {
			display: none;
		}
		.ContentModal__portrait {
			display: flex;
			width: 38%;
		}
		.ContentModal {
			flex-direction: row;
			justify-content: space-around;
			padding: 10px 0;
		}
		.ContentModal__about {
			width: 58%;
			padding: 0;
			height: 100%;
		}
		.ContentModal__title {
			font-size: 3.5vw;
		}
		.ContentModal__description {
			font-size: 22px;
		}
	}
`;

export default TransitionsModal;
