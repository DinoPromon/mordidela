import styled from "styled-components";

import { fadeIn, fadeOut, fadeDuration } from "@utils/animations";
import { PURPLE } from "@utils/colors";

type Props = {
  shouldShowComponent: boolean;
};

const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;

  animation-name: ${(props) => (props.shouldShowComponent ? fadeIn : fadeOut)};
  animation-duration: ${fadeDuration}ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;

  & > h3 {
    color: ${PURPLE};
  }
`;

export default Wrapper;
