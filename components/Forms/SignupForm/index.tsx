import React, { useRef } from "react";

import Wrapper from "../styled";
import SignupFormActions from "./SignupFormActions";
import { Input } from "@components/shared";
import { emailValidation, passwordValidation } from "@utils/validations";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

// separar form do endereço
const SignUpForm: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Input type="text" id="Nome" inputValidation={passwordValidation} placeholder="Nome" />
      <Input
        type="text"
        id="DataNascimento"
        inputValidation={passwordValidation}
        placeholder="Data de nascimento"
      />
      <Input
        type="text"
        id="Telefone"
        inputValidation={passwordValidation}
        placeholder="Telefone"
      />
      <Input type="text" id="Email" inputValidation={emailValidation} placeholder="Email" />
      <Input type="password" id="Senha" inputValidation={passwordValidation} placeholder="Senha" />
      <Input
        type="password"
        id="SenhaConfirmada"
        inputValidation={passwordValidation}
        placeholder="Confirme a senha"
      />
      <SignupFormActions onBack={props.onBack} onNext={props.onNext} />
    </Wrapper>
  );
};

export default SignUpForm;
