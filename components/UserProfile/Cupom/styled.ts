import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

export const CupomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 50px;
`;

export const CupomTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content:center;
  font-weight: bold;
  /* color: ${PURPLE}; */
`;

export const CupomDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
`;

export const CupomData = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;