import styled from "styled-components";
import { PURPLE } from "@utils/colors";

export const ItemAddsListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const AddOptionContainer = styled.li`
  & > label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    & > p {
      flex-shrink: 0;
      margin-left: auto;
      color: ${PURPLE};
      font-weight: bold;
    }
  }
`;
