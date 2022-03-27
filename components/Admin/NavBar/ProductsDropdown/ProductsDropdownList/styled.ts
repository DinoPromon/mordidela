import { PINK, PURPLE, ORANGE } from "@utils/colors";
import styled, { keyframes } from "styled-components";
import { DROPDOWN_ANIMATION_TIME } from "@components/NavBar/NavBarList/ProfileDropdown/DropdownList/styled";

type Props = {
  animation: ReturnType<typeof keyframes>;
};

export const ProductsDropdownListContainer = styled.ul<Props>`
  position: absolute;
  text-align: center;
  z-index: 2;
  background-color: white;
  overflow: hidden;
  width: 200px;
  font-weight: bold;
  list-style: none;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  animation: ${(props) => props.animation} ${DROPDOWN_ANIMATION_TIME}ms ease-out forwards;
  margin: 0.5rem auto;
  top: 100%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, 0);
`;

export const ProductsDropdownListItem = styled.li`
  color: ${PURPLE};
  padding: 0.25rem 0;
  background-color: transparent;
  transition: background-color 250ms;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${PINK};
  }

  & > a {
    display: inline-block;
    width: 100%;
    color: inherit;
    text-decoration: none;
    transition: color 250ms;
    font-size: 1rem;
  }
`;
