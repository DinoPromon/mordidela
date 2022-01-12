import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

export const OrdersContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;

  @media (max-width: 600px) {
    padding: 1rem 1.5rem;
  }
`;

export const OrdersTitle = styled.h1`
  display: flex;
  font-size: 2.5rem;
  margin: 1rem 0;
  font-weight: bold;
  color: ${PURPLE};
`;
