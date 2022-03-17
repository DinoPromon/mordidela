import styled from "styled-components";

import { PINK } from "@utils/colors";

export const OrdersCardContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 3rem;
  column-gap: 3rem;
`;

export const OrdersCard = styled.li`
  width: 350px;
  height: 300px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const OrdersCardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OrdersCardTitle = styled.h2`
  font-size: 13pt;
`;

export const OrdersUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const OrdersUser = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    font-size: 13px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;

  & > p {
    color: ${PINK};
    font-weight: bold;
  }
`;
