import styled from "styled-components";

import { fadeAnimation, fadeDuration } from "@utils/animations";
import { PURPLE } from "@utils/colors";

type Props = {
  shouldShowComponent: boolean;
};

export const CartChangeSelectContainer = styled.div<Props>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.35rem;

  ${(props) => fadeAnimation(props.shouldShowComponent, fadeDuration)}
  & > h3 {
    color: ${PURPLE};
  }
`;
