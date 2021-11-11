import React, { useEffect, useState } from "react";

import Wrapper from "../styled";
import SignupFormActions from "./SignupFormActions";
import { FormInput } from "@components/shared";
import { userFormValidation } from "@utils/validations";
import { UserFormData } from "@my-types/signup";
import { getSignupErrorMessage } from "@utils/error-message";

type Props = {
  state: UserFormData;
  setState: React.Dispatch<React.SetStateAction<UserFormData>>;
  onBack: () => void;
  onNext: () => void;
};

const SignUpForm: React.FC<Props> = (props) => {
  const { state, setState, onBack, onNext } = props;
  const [canSubmit, setCanSubmit] = useState(false);

  const hasErrorInInputs = (formState: typeof state) => {
    for (let k in userFormValidation) {
      const key = k as keyof UserFormData;
      const isValid = userFormValidation[key](formState[key], formState["senha"]);
      if (!isValid) return key;
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorInput = hasErrorInInputs(state);
    if (!errorInput) onNext();
  };

  useEffect(() => {
    const hasSomeError = hasErrorInInputs(state);
    setCanSubmit(!hasSomeError);
  }, [state]);

  return (
    <Wrapper onSubmit={submitHandler}>
      <FormInput
        id="nome"
        isInputValid={userFormValidation.nome(state.nome)}
        value={state.nome}
        errorMessage={getSignupErrorMessage("nome")}
        placeholder="Nome*"
        onChange={changeHandler}
      />
      <FormInput
        id="data_nascimento"
        isInputValid={userFormValidation.nome(state.data_nascimento)}
        value={state.data_nascimento}
        errorMessage={getSignupErrorMessage("data_nascimento")}
        onChange={changeHandler}
        placeholder="Data de nascimento*"
      />
      <FormInput
        id="telefone"
        isInputValid={userFormValidation.nome(state.telefone)}
        value={state.telefone}
        errorMessage={getSignupErrorMessage("telefone")}
        onChange={changeHandler}
        placeholder="Telefone*"
      />
      <FormInput
        id="email"
        isInputValid={userFormValidation.email(state.email)}
        value={state.email}
        errorMessage={getSignupErrorMessage("email")}
        placeholder="Email*"
        onChange={changeHandler}
      />
      <FormInput
        type="password"
        id="senha"
        isInputValid={userFormValidation.senha(state.senha)}
        value={state.senha}
        errorMessage={getSignupErrorMessage("senha")}
        placeholder="Senha*"
        onChange={changeHandler}
      />
      <FormInput
        type="password"
        id="senha_confirmada"
        isInputValid={userFormValidation.senha_confirmada(state.senha, state.senha_confirmada)}
        value={state.senha_confirmada}
        errorMessage={getSignupErrorMessage("senha_confirmada")}
        placeholder="Confirme a senha*"
        onChange={changeHandler}
      />
      <p>Campos com * são obrigatórios.</p>
      <SignupFormActions onBack={onBack} disabled={!canSubmit}/>
    </Wrapper>
  );
};

export default SignUpForm;
