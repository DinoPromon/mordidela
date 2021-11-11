import styled from 'styled-components';

import { PINK } from '@utils/colors';

type Props = {
	isDisabled: boolean
}

const CustomButton = styled.button<Props>`
	border: none;
	font-size: 1rem;
	border-radius: 5px;
	background-color: ${props => props.isDisabled ? "transparent" : PINK};
	color: ${props => props.isDisabled ? PINK : "white"};
	padding: 0.75rem 1.5rem;
	transition: background-color 250ms, color 250ms;

	&:hover {
		cursor: pointer;
	}
`;

export default CustomButton;
