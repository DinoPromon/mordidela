import styled from "styled-components";

export const OrdersHistoryListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  flex-direction: column;
  list-style: none;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
