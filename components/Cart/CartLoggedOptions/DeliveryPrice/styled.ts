import styled from "styled-components";

import { fadeIn, fadeDuration, fadeOut } from "@utils/animations";

type Props = {
  shouldShowComponent: boolean;
};

const CustomText = styled.p<Props>`
  animation-name: ${(props) => (props.shouldShowComponent ? fadeIn : fadeOut)};
  animation-duration: ${fadeDuration}ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;

export default CustomText;
