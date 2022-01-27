import styled from "styled-components";
import { PURPLE } from "@utils/colors";

export const CartChangeSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.35rem;

  & > h3 {
    color: ${PURPLE};
    font-size: 1rem;
  }
`;
