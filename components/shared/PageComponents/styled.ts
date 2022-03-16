import styled from "styled-components";
import { PURPLE } from "@utils/colors";

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0.5rem 0;
  font-weight: bold;
  color: ${PURPLE};
`;

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 3rem 1.5rem 3rem;

  @media (max-width: 600px) {
    padding: 1rem 1.5rem;
  }
`;
