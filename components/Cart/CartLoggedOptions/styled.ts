import styled from "styled-components";
import { CartFormSubtotalText } from "../styled";

export const CartFormErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CartFormErrorMessage = styled.p`
  color: red;
`;

export const CartFormTotalText = styled(CartFormSubtotalText)`
  font-size: 1.25rem;
  text-align: center;

  & > span {
    font-size: 1.25rem;
  }
`;
