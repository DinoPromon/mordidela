import styled from "styled-components";
import { ErrorMessage } from "@components/shared/StyledComponents";

export const ForgotPasswordText = styled.a`
  text-style: none;
  color: blue;
`;

export const LoginActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${ForgotPasswordText} {
    margin-right: auto;
  }
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;

  ${ErrorMessage} {
    text-align: center;
  }
`;
