import { PINK, PURPLE } from "@utils/colors";
import { Form } from "formik";
import styled from "styled-components";

export const CartForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CartFormTitle = styled.h2`
  font-size: 18px;
  text-align: center;
  color: ${PURPLE};
`;

export const CartFormLoginText = styled.p`
  text-align: center;
  font-size: 1.25rem;
  padding: 0.25rem 0;
  & > span {
    font-size: inherit;
  }
`;

export const CartOrderConfirmation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
    color: ${PINK};
    border: 1px ${PINK} solid;
    background-color: transparent;
  }

  & > button:nth-child(even) {
    background-color: ${PINK};
    color: white;
  }
`;

export const CartOrderConfirmedIcon = styled.div`
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
`;

export const CartEmptyMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
`;

export const CartEmptyMessage = styled.h4`
  font-size: 30px;
  font-weight: normal;
  color: ${PINK};
`;

export const CartLoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
