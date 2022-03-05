import styled from "styled-components";
import { Form } from "formik";
import { motion } from "framer-motion";

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

export const AddressesFormButtonContainer = styled(motion.div)<AddressFormButtonContainerProps>`
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

export const AddressListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

export const AddressListItem = styled.li`
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
`;
