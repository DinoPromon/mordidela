import { PURPLE, PINK } from "@utils/colors";
import styled from "styled-components";

export const AddressesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 50px;
  width: 100%;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CustomInputsDesign = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media (max-width: 550px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const AddAddress = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: start;

  &:hover {
    cursor: pointer;
    color: ${PINK};
    text-decoration: underline;
  }
`;