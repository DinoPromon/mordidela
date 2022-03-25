import styled from "styled-components";

export const ProductsComponentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductsComponentsTitle = styled.h1`
  text-align: center;
  padding-top: 0.5rem;
  text-decoration: underline;
`;

export const AddProductsComponentsTitle = styled.h3`
  text-align: center;
  padding: 1rem;
`;

export const ProductsComponentsButtonContainer = styled.div<{ isEdit?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isEdit }) => (isEdit ? "space-between" : "center")};
  margin-top: 1rem;
`;

export const ProductsComponentsIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: auto;
  align-items: center;
`;