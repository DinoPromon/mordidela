import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const AboutInformation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7rem;
  justify-content: center;
  padding: 0 1rem;
  padding-bottom: 1rem;

  @media (max-width: 740px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

`;

export const AboutInformationTitle = styled.h2`
  color: ${PINK};
  padding-bottom: 0.5rem;
  text-decoration: underline;
`;

export const MordidelaInformations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;