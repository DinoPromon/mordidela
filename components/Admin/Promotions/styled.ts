import { PINK, PURPLE } from "@utils/colors";
import { makeStyles } from "@material-ui/core";
import styled from "styled-components";

export const PromotionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PromotionsTitle = styled.h1`
  padding: 1rem;
`;

export const PromotionsType = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  padding-bottom: 1rem;
`;

export const PromotionsTypeTitle = styled.h2`
  cursor: pointer;

  &:hover {
    border-bottom: 2px ${PINK} solid;
  }
`;

export const PromotionsCardContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 3rem;
  column-gap: 3rem;
  list-style: none;
`;

export const PromotionsCard = styled.li`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PromotionsCardTitle = styled.h2`
  color: ${PINK};
  display: flex;
  justify-content: center;
  padding-bottom: 0.5rem;
`;

export const PromotionsCardContent = styled.p`
  color: ${PURPLE};
  font-weight: bold;

  & > span {
    color: #3b3b3b;
    font-weight: normal;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PromotionsCardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  gap: 0.5rem;
`;