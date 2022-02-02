import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

type FilterItemProps = {
  isSelected: boolean;
};

export const FilterSelector = styled.button`
  border: none;
  width: 100%;
  background: transparent;
  outline: none;
  font-weight: bold;
  font-size: 1rem;
`;

export const FilterItem = styled.li<FilterItemProps>`
  background-color: ${(props) => (props.isSelected ? PURPLE : "transparent")};
  margin: 10px;
  padding: 10px;
  border-radius: 100px;
  border: 1px solid ${PURPLE};
  transition: background-color 250ms;
  cursor: pointer;  

  ${FilterSelector} {
    transition: color 250ms;
    color: ${(props) => (props.isSelected ? "white" : PURPLE)};
    cursor: inherit;
  }
`;

export const FilterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 1.5rem;
  width: 100%;

  & > .left-arrow-button {
    position: absolute;
    left: 0;
  }

  & > .right-arrow-button {
    position: absolute;
    right: 0;
  }
`;

export const FilterListContainer = styled.ul`
  list-style: none;
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

export const FilterArrowButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: ${PURPLE};
  &:hover {
    cursor: pointer;
  }
`;
