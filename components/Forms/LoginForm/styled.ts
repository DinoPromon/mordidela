import styled from "styled-components";

export const ForgotPasswordText = styled.a`
  text-style: none;
  color: blue;
`;

export const LoginActionsContainer = styled.div`
  display: flex;
  margin: 1rem 2px;
  flex-direction: row;
  align-items: center;

  ${ForgotPasswordText} {
    margin-right: auto;
  }
`;
