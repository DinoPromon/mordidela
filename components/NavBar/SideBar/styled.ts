import styled, { keyframes } from "styled-components";

import { PINK } from "@utils/colors";


const SIDEBAR_WIDTH = "30vw";
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

const Aside = styled.aside<Props>`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 20;
  height: 100vh;
  width: ${SIDEBAR_WIDTH};
  background-color: rgba(130, 53, 206, 0.9);
  /* background-color: rgba(231, 0, 149, 0.7); */

  animation: ${(props) => props.animation} ${SIDEBAR_ANIMATION_TIME}ms ease-out forwards;

  & > button {
    position: absolute;
    right: 0.75rem;
    top: 0.5rem;
    background-color: transparent;
    border: none;
    outline: none;
  }

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
  }
`;

export default Aside;
