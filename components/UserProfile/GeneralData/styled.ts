import { PURPLE } from "@utils/colors";
import styled from "styled-components";

export const GeneralDataTitle = styled.h1`
  display: flex;
  font-size: 2.5rem;
  margin: 1rem 0;
  font-weight: bold;
  color: ${PURPLE};
`;

export const GeneralDataContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

export const NumberOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${PURPLE};
  height: 100px;
  width: 100px;
  border-radius: 50%;

  & > h3 {
    color: ${PURPLE};
  }

  & > p {
    color: ${PURPLE};
  }
`;

export const CustomTextFieldSmallerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
