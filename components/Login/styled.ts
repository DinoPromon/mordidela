import styled from "styled-components";
import { Form } from "formik";

import { PINK, ORANGE } from "@utils/colors";
import { FORM_SCREEN_MAX_WIDTH } from "@utils/styles";

export const LoginContainer = styled.div`
  display: flex;
  position: relative;
  padding: 2rem 0;
  flex-direction: column;
  width: 85%;
  justify-content: center;
  gap: 1.5rem;
  max-width: ${FORM_SCREEN_MAX_WIDTH};
`;

export const LoginContainerArrowLeft = styled.span`
  position: absolute;
  top: 2rem;
`;

export const LoginImage = styled.image`
  align-self: center;
  width: 200px;
`;

export const LoginNotHaveAccount = styled.p`
  width: auto;
  font-size: 18px;
  text-align: center;
  color: ${ORANGE};
`;

export const LoginRegister = styled.a`
  text-decoration: none;
  color: ${PINK};
  padding: 1px 0;
  border-bottom: 1px ${PINK} solid;
`;

export const FormikForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  & > p {
    font-size: 13px;
    font-weight: bold;
    margin: 0 0.25rem;
  }
`;
