import { PINK } from "@utils/colors";
import styled from "styled-components";

export const AddProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
