import { PINK } from "@utils/colors";
import styled from "styled-components";

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
`;

export const OrdersButtonContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
`;

export const OrdersButton = styled.li`
  padding: 10px;
  border-radius: 100px;
  border: 1px solid ${PINK};
  cursor: pointer;
  list-style: none;
  color: ${PINK};
  font-weight: bold;
`;

export const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
