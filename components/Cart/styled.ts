import styled from "styled-components";
import { Form } from "formik";
import { PINK, PURPLE } from "@utils/colors";

export const CartForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CartFormTitle = styled.h2`
  font-size: 18pt;
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
