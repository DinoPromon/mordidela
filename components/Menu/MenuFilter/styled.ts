import styled from "styled-components";

export const FilterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
  background-color: rgba(255, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
`;

export const FilterSelector = styled.button`
  border: none;
  width: 100%;
  background: transparent;
  outline: none;
`;

export const FilterArrowButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`;
