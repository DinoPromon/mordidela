import styled from "styled-components";

const List = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-row-gap: 2.5rem;
  list-style: none;

  @media (min-width: 640px ) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  
  @media (min-width: 1100px ) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
  }
`;

export default List;