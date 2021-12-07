import styled, { keyframes } from "styled-components";

import { PINK  } from "@utils/colors";

const openAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const closeAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20%);
    opacity: 0;
  }
`;

type Props = {
  isCloseAnimation: boolean;
  duration: number;
};

const Wrapper = styled.div<Props>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;

  & > div {
    position: relative;
    background-color: white;
    width: 90%;
    max-width: 600px;
    border-radius: 0.5rem;
    overflow: hidden;
    animation-name: ${(props) => (props.isCloseAnimation ? closeAnimation : openAnimation)};
    animation-duration: ${(props) => `${props.duration}ms`};
    animation-timing-function: ${(props) => (props.isCloseAnimation ? "ease-out" : "ease-out")};
    animation-fill-mode: forwards;

    & > span {
      font-size: 2rem;
      color: ${PINK};
      position: absolute;
      right: 12px;
      top: 5px;
      cursor: pointer;
    }
  }
`;

export default Wrapper;
