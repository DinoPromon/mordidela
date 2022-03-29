import styled, { keyframes } from "styled-components";
import { PURPLE } from "@utils/colors";

export const DROPDOWN_ANIMATION_TIME = 120;
export const renderAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const unmountAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

type Props = {
  animation: ReturnType<typeof keyframes>;
};

export const DropdownListContainer = styled.ul<Props>`
  position: absolute;
  text-align: center;
  z-index: 2;
  background-color: white;
  overflow: hidden;
  width: 100%;
  min-width: 130px;
  max-width: 130px;
  font-weight: bold;
  list-style: none;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  animation: ${(props) => props.animation} ${DROPDOWN_ANIMATION_TIME}ms ease-out forwards;
  left: 0;
  right: 0;
  top: 100%;
  margin: 0.5rem auto;
`;

export const DropdownListItem = styled.li`
  color: ${PURPLE};
  padding: 0.5rem 0;
  background-color: transparent;
  transition: background-color 250ms;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${PURPLE};
  }

  & > a {
    display: inline-block;
    width: 100%;
    color: inherit;
    text-decoration: none;
    transition: color 250ms;
  }
`;
