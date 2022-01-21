import styled from "styled-components";

import { PINK, PURPLE } from "@utils/colors";
import { fadeAnimation, fadeDuration } from "@utils/animations";

type Props = {
  shouldShowComponent: boolean;
};

export const CartPaymentValueContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  ${(props) => fadeAnimation(props.shouldShowComponent, fadeDuration)}
  & > h3 {
    color: ${PURPLE};
  }
`;

export const CartPaymentInputChange = styled.div`
  display: flex;
  align-items: center;

  & > input {
    background-color: white;
    text-align: center;
    border-radius: 5px;
    border: 1px ${PINK} solid;
    outline: none;
    width: 5rem;
    padding: 2px;
    color: inherit;
  }

  & > span {
    color: ${PURPLE};
    font-weight: bold;
    padding-right: 5px;
  }
`;
