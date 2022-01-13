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
  width: 100%;
  min-width: 120px;
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

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -7px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

export const DropdownListItem = styled.li`
  color: ${PURPLE};
  padding: 0.5rem 0;

  &:hover {
    cursor: pointer;
  }

  & > a {
    color: ${PURPLE};
    padding: 0.5rem 0;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }
`;
