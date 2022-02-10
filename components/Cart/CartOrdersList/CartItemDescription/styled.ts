import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const TrashPriceContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;

export const TrashPriceText = styled.p`
  font-weight: bold;
  color: ${PURPLE};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CartItemDescriptionContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  ${TrashPriceContainer} {
    margin-left: auto;
  }

  & > span {
    font-size: inherit;
    font-weight: bold;
    color: ${PINK};
    padding-right: 5px;
  }
`;
