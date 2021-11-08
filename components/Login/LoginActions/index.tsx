import React from "react";

import Wrapper from "./styled";
import { FormButton } from "@components/shared";

const LoginActions: React.FC = () => {
  return (
    <Wrapper>
      <p>Esqueceu sua senha?</p>
      <FormButton>Entrar</FormButton>
    </Wrapper>
  );
};

export default LoginActions;
