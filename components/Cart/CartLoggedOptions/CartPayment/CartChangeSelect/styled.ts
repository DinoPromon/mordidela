import styled from "styled-components";
import { PURPLE } from "@utils/colors";

export const CartChangeSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.35rem;

  @media (max-width: 400px) {
    gap: 0;
    flex-direction: column;
  }

  & > h4 {
    color: ${PURPLE};
  }
`;
