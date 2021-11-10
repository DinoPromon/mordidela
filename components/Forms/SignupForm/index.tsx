import React from "react";

import Wrapper from "../styled";
import SignupFormActions from "./SignupFormActions";
import { Input } from "@components/shared";
import { emailValidation, passwordValidation, nameValidation } from "@utils/validations";
import { UserFormData } from "@my-types/signup";

type Props = {
  state: UserFormData;
  setState: React.Dispatch<React.SetStateAction<UserFormData>>;
  onBack: () => void;
  onNext: () => void;
};

// separar form do endereço
const SignUpForm: React.FC<Props> = (props) => {
  const nextHandler = () => {
    props.onNext();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setState({
      ...props.state,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Wrapper>
      <Input
        type="text"
        id="nome"
        inputValidation={nameValidation}
        placeholder="Nome"
        onChange={changeHandler}
      />
      <Input
        type="text"
        id="data_nascimento"
        inputValidation={nameValidation}
        onChange={changeHandler}
        placeholder="Data de nascimento"
      />
      <Input
        type="text"
        id="telefone"
        inputValidation={nameValidation}
        onChange={changeHandler}
        placeholder="Telefone"
      />
      <Input
        type="text"
        id="email"
        inputValidation={emailValidation}
        placeholder="Email"
        onChange={changeHandler}
      />
      <Input
        type="password"
        id="senha"
        inputValidation={passwordValidation}
        placeholder="Senha"
        onChange={changeHandler}
      />
      <Input
        type="password"
        id="senha_confirmada"
        inputValidation={passwordValidation}
        placeholder="Confirme a senha"
        onChange={changeHandler}
      />
      <SignupFormActions onBack={props.onBack} onNext={nextHandler} />
    </Wrapper>
  );
};

export default SignUpForm;
