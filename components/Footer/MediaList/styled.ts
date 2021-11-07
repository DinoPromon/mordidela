import styled from "styled-components";

const CustomList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 1rem 1rem;

  & > li {
    margin: 0 10px;
  }
`;

export default CustomList;
