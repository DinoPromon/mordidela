import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

export const CartFormErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const CartFormErrorMessage = styled.p`
  max-width: 90%;
  color: red;
`;

export const CartCupomData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  color: ${PINK};
  font-weight: bold;

  & > span {
    color: ${PURPLE};
    font-weight: bold;
  }
`;
