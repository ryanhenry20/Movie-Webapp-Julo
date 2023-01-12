import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';

interface ICaraousel {
	id: number;
	media_type: string;
}

type credit = {
	profile_path: string;
	name: string;
};

const handleDragStart = (e: React.SyntheticEvent) => e.preventDefault();

const Gallery: React.FC<ICaraousel> = ({ id, media_type }) => {
	const [credits, setCredits] = useState([]);

	const items = credits.map((c: credit) => (
		<Wrapper className="carouselItem">
			<img
				src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
				alt={c?.name}
				onDragStart={handleDragStart}
				className="carouselItem__img"
			/>
			<b className="carouselItem__txt">{c?.name}</b>
		</Wrapper>
	));

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	};

	const fetchCredits = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${'a6f1d6141ab79ab9c704ded6c2d00d37'}&language=en-US`
		);
		setCredits(data.cast);
	};

	useEffect(() => {
		fetchCredits();
		// eslint-disable-next-line
	}, []);

	return (
		<AliceCarousel
			mouseTracking
			infinite
			disableDotsControls
			disableButtonsControls
			responsive={responsive}
			items={items}
			autoPlay
		/>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	object-fit: contain;
	padding: 10px;

	.carouselItem__img {
		border-radius: 10px;
		margin-bottom: 5px;
		box-shadow: 0px 0px 5px black;
	}
`;

export default Gallery;
