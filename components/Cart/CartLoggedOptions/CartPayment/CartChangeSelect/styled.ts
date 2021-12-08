import styled from "styled-components";

import { fadeAnimation } from "@utils/animations";
import { PURPLE } from "@utils/colors";

type Props = {
  shouldShowComponent: boolean;
};

const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;

  ${(props) => fadeAnimation(props.shouldShowComponent)}
  & > h3 {
    color: ${PURPLE};
  }
`;

export default Wrapper;
