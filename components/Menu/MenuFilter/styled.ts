import { PURPLE } from "@utils/colors";
import styled from "styled-components";

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

export const FilterItem = styled.li`
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-radius: 100px;
`;

export const FilterSelector = styled.button`
  border: none;
  width: 100%;
  background: transparent;
  outline: none;
  color: ${PURPLE};
  font-weight: bold;
`;

export const FilterArrowButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`;
