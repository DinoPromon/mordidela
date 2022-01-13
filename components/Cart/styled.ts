import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & > h2 {
    font-size: 18px;
    text-align: center;
    color: ${PURPLE};
  }

  & > p {
    width: 100%;
    text-align: end;
    color: ${PINK};
    font-weight: bold;

    & > span {
      color: ${PURPLE};
    }
  }

  & > p:last-of-type {
    text-align: center;
    font-size: 1.25rem;
    padding: 0.25rem 0;
    & > span {
      font-size: inherit;
    }
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    & > p {
      color: red
    }
  }
`;

export default CustomForm;

// CSS da confirmação do pedido
/* export const CartOrderConfirmation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-top: 2rem;
`;

export const CartOrderConfirmationButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 2rem;

  & > button:nth-child(odd) {
    background-color: red;
  }

  & > button:nth-child(even) {
    background-color: green;
  }
`; */

// CSS de pedido confirmado
/* export const CartOrderConfirmedIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const CartOrderConfirmedMessage = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`; */
