import styled from "styled-components";
import { PURPLE } from "@utils/colors";

export const DateFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  & > h4 {
    color: ${PURPLE};
  }
`;
