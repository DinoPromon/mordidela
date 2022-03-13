import styled from "styled-components";
import { PURPLE } from "@utils/colors";

export const OrdersModalTitle = styled.h2`
  font-size: 18px;
  text-align: center;
  color: ${PURPLE};
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`;

export const OrdersAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
`;

export const OrdersDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;

export const TotalContainer = styled.div`
  padding-top: 1rem;
`;

export const OrderFlavorsText = styled.p`
  font-size: 0.75rem;
`;

export const OrdersAddressComplement = styled.p`
  font-size: 13px;
`;

