import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

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

export const OrdersModalTitle = styled.h2`
  font-size: 18px;
  text-align: center;
  color: ${PURPLE};
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`;

export const OrdersAddresContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
`;

export const OrdersDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TotalContainer = styled.div`
  padding-top: 1rem;
`;