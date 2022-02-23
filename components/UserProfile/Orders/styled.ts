import styled from "styled-components";
import { PINK } from "@utils/colors";

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const MoreDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 14px;
  cursor: pointer;
  color: ${PINK};

  & > p:hover {
    text-decoration: underline;
  }
`;
