import styled, { keyframes } from "styled-components";

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from "@utils/styles";
import { PURPLE } from "@utils/colors";

export const SIDEBAR_ANIMATION_TIME = 150;

export const renderAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;
export const unmountAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

type Props = {
  animation: ReturnType<typeof keyframes>;
};

export const Aside = styled.aside<Props>`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 20;
  height: 100vh;
  width: ${SIDEBAR_WIDTH};
  max-width: ${SIDEBAR_MAX_WIDTH};
  background-color: ${PURPLE};

  animation: ${(props) => props.animation} ${SIDEBAR_ANIMATION_TIME}ms ease-out forwards;

  & > button {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    border: none;
    outline: none;
    background-color: transparent;

    &:hover {
      cursor: pointer;
    }
  }

  & > a {
    text-decoration: none;
    margin-top: 1.25rem;
  }
`;