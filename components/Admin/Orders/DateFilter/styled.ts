import styled from "styled-components";
import { PURPLE } from "@utils/colors";
import { Form } from "formik";

export const DateFilterForm = styled(Form)`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  & > h4 {
    color: ${PURPLE};
    margin-top: 8px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 2px;
`;
