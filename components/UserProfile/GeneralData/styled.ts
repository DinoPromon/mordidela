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
  padding-bottom: 50px;
`;

export const NumberOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${PURPLE};
  height: 120px;
  width: 120px;
  border-radius: 50%;

  & > h3 {
    color: ${PURPLE};
    font-size: 1.5rem;
  }

  & > p {
    color: ${PURPLE};
    font-size: 1rem;
  }
`;

export const CustomTextFieldSmallerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media (max-width: 490px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

