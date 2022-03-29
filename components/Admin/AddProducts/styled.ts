import styled from "styled-components";
import { Form } from "formik";
import { PINK } from "@utils/colors";

export const AddProductsTitle = styled.h2`
  text-align: center;
  padding: 1rem;
  color: ${PINK};
`;

export const AddProductsRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
`;

export const ProductImageInput = styled.input`
  display: none;
`;

export const ProductFormActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 6px 0;
`;

export const ProductForm = styled(Form)`
  width: 85%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${ProductFormActionsContainer} {
    margin-top: auto;
  }
`;

export const AddProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
