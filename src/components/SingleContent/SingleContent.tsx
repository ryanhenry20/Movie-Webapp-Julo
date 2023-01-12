import { Badge } from '@material-ui/core';
import styled from '@emotion/styled';
import { img_300, unavailable } from '../../config/config';
import ContentModal from '../ContentModal/ContentModal';

interface ISingleContent {
	id: number;
	poster: string;
	title: string;
	date: string;
	media_type: string;
	vote_average: number;
}

const SingleContent: React.FC<ISingleContent> = ({
	id,
	poster,
	title,
	date,
	media_type,
	vote_average,
}) => {
	return (
		<ContentModal media_type={media_type} id={id}>
			<Badge
				badgeContent={vote_average}
				color={vote_average > 6 ? 'primary' : 'secondary'}
			/>
			<ImgWrapper
				src={poster ? `${img_300}${poster}` : unavailable}
				alt={title}
			/>
			<TitleWrapper className="title">{title}</TitleWrapper>
			<SubTitleWrapper>
				{media_type === 'tv' ? 'TV Series' : 'Movie'}
				<span>{date}</span>
			</SubTitleWrapper>
		</ContentModal>
	);
};

const ImgWrapper = styled.img`
	border-radius: 10px;
`;

const TitleWrapper = styled.b`
	width: 100%;
	text-align: center;
	font-size: 17px;
	padding: 8px 0;
`;

const SubTitleWrapper = styled.span`
	display: flex;
	justify-content: space-between;
	padding-bottom: 3px;
	padding: 0 2px;
	padding-bottom: 3px;
`;

export default SingleContent;
