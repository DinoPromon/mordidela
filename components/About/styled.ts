import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const AboutInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 0 1rem;
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
  padding: 1rem;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
`;