import { Form } from "formik";
import styled from "styled-components";

export const AddressesInputContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 2rem;
  width: 100%;
`;

export const AddressesFormButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;s
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

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

export const ShowAddress = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  & > span {
    display: flex;
    align-items: center;
  }
`;

export const AddresData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddresIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: auto;
  align-items: center;

  & > span {
    cursor: pointer;
  }
`;
