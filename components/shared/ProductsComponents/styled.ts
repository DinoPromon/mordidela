import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const useTableStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    borderRadius: 5,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
}));

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
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export const TableTitle = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
`;

export const CustomTableContainer = styled.div`
  overflow-x: auto;
  padding-bottom: 1rem;
`;
