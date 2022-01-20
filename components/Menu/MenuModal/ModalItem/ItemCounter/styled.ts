import styled from "styled-components";

export const ItemCounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100px;
  padding: 5px;

  & > span {
    font-weight: bold;
  }

  & > button {
    border: none;
    background-color: transparent;
    font-size: 1rem;
    cursor: pointer;
  }
`;