import { PURPLE, PINK } from "@utils/colors";
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

export const CartCoupomDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
`;

export const CartCupomColorfulText = styled.p`
  font-weight: bold;
  color: ${PINK};

  & > span {
    color: ${PURPLE};
    font-weight: bold;
  }
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
