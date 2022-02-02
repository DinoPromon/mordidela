import { PINK, PURPLE } from "@utils/colors";
import styled, { css } from "styled-components";

export const CartItemDescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1rem 5fr 2fr;
  column-gap: 0.5rem;

  & > span {
    font-size: inherit;
    font-weight: bold;
    color: ${PINK};
    padding-right: 5px;
  }
`;

export const CartItemDescriptionTrashPrice = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  & > p {
    font-weight: bold;
    color: ${PURPLE};
  }
`;
