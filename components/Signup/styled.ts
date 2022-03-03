import styled from "styled-components";
import { Form } from "formik";

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  padding: 2rem 0;
  justify-content: center;
  gap: 1.5rem;
  max-width: 400px;
`;

export const SignupImageContainer = styled.div`
  position: relative;
  margin: 1rem 0;
  height: 140px;
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
