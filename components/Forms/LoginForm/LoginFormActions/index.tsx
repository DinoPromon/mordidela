import React from "react";

import Wrapper from "./styled";
import { FormButton } from "@components/shared";

type Props = {
  disabled: boolean
}

const LoginFormActions: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <p>Esqueceu sua senha?</p>
      <FormButton type="submit" disabled={props.disabled}>Entrar</FormButton>
    </Wrapper>
  );
};

export default LoginFormActions;
