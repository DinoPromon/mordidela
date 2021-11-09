import React, { useRef } from "react";

import Wrapper from "../styled";
import { Input } from "@components/shared";
import { emailValidation, passwordValidation } from "@utils/validations";

// separar form do endereço
const SignUpForm: React.FC = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
	const confirmedPasswordRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <Input
        type="text"
        id="Nome"
        inputRef={nameRef}
        inputValidation={passwordValidation}
        placeholder="Nome"
      />
      <Input
        type="text"
        id="DataNascimento"
        inputRef={dataRef}
        inputValidation={passwordValidation}
        placeholder="Data de nascimento"
      />
      <Input
        type="text"
        id="Telefone"
        inputRef={telefoneRef}
        inputValidation={passwordValidation}
        placeholder="Telefone"
      />
      <Input
        type="text"
        id="Email"
        inputRef={emailRef}
        inputValidation={emailValidation}
        placeholder="Email"
      />
      <Input
        type="password"
        id="Senha"
        inputRef={passwordRef}
        inputValidation={passwordValidation}
        placeholder="Senha"
      />
      <Input
        type="password"
        id="SenhaConfirmada"
        inputRef={confirmedPasswordRef}
        inputValidation={passwordValidation}
        placeholder="Confirme a senha"
      />
    </Wrapper>
  );
};

export default SignUpForm;
