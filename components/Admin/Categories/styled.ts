import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CategoriesTitle = styled.h2`
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  text-decoration: underline;
`;

export const CategoriesListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  /* border: 1px gray solid; */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  list-style: none;
  max-width: 400px;
  width: 100%;
  padding: 0 1rem;
`;

export const CategoriesList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: ${PURPLE};
  padding: 0.5rem 0;
`;

export const CategoriesListWhitBorder = styled(CategoriesList)`
  border-top: 1px solid gray;
`;

export const CategoriesIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: auto;
  align-items: center;
`;

export const AddCategoriesTitle = styled.h3`
  text-align: center;
  padding: 1rem;
  margin-top: 1.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;