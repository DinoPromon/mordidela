import styled from "styled-components";
import { Form } from "formik";

type AddressFormButtonContainerProps = {
  isEdit: boolean;
};

export const AddressesFormikForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 2rem;
  width: 100%;
`;

export const AddressesFormButtonContainer = styled.div<AddressFormButtonContainerProps>`
  display: flex;
  width: 100%;
  justify-content: ${({ isEdit }) => (isEdit ? "space-between" : "center")};
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

export const SuccessMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
`;
