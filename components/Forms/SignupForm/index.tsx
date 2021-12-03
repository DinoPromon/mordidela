import React, { useEffect, useState } from "react";

import Wrapper from "../styled";
import SignupFormActions from "./SignupFormActions";
import { FormInput } from "@components/shared";
import { dateChangeHandler, phoneNumberChangeHandler } from "@utils/formatters";
import { userFormValidations } from "@utils/validations";
import { UserFormData } from "@my-types/forms";
import { getSignupErrorMessage } from "@utils/error-message";

type Props = {
  state: UserFormData;
  setState: React.Dispatch<React.SetStateAction<UserFormData>>;
  onBack: () => void;
  onSubmit: () => void;
};

const SignUpForm: React.FC<Props> = (props) => {
  const { state: formState, setState: setFormState, onBack, onSubmit } = props;
  const [canSubmit, setCanSubmit] = useState(false);

  const hasErrorInInputs = (formInputs: typeof formState) => {
    for (let k in userFormValidations) {
      const key = k as keyof UserFormData;
      const isValid = userFormValidations[key](formInputs[key], formInputs["senha"]);
      if (!isValid) return true;
    }
    return false;
  };

  const changeFormStateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    if (id === "data_nascimento") event.target.value = dateChangeHandler(event.target.value, formState[id]);
    else if (id === "telefone") event.target.value = phoneNumberChangeHandler(event.target.value, formState[id]);
    setFormState((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasError = hasErrorInInputs(formState);
    if (!hasError) onSubmit();
  };

  useEffect(() => {
    setCanSubmit(!hasErrorInInputs(formState));
  }, [formState]);

  return (
    <Wrapper onSubmit={submitHandler}>
      <FormInput
        id="nome"
        isInputValid={userFormValidations.nome(formState.nome)}
        value={formState.nome}
        errorMessage={getSignupErrorMessage("nome")}
        shoulRemoveAditionalSpaces={true}
        placeholder="Nome"
        onChange={changeFormStateHandler}
      />
      <FormInput
        id="data_nascimento"
        isInputValid={userFormValidations.data_nascimento(formState.data_nascimento)}
        value={formState.data_nascimento}
        errorMessage={getSignupErrorMessage("data_nascimento")}
        onChange={changeFormStateHandler}
        placeholder="Data de nascimento*"
      />
      <FormInput
        id="telefone"
        isInputValid={userFormValidations.telefone(formState.telefone)}
        value={formState.telefone}
        errorMessage={getSignupErrorMessage("telefone")}
        shoulRemoveAditionalSpaces={true}
        onChange={changeFormStateHandler}
        placeholder="Telefone*"
      />
      <FormInput
        id="email"
        isInputValid={userFormValidations.email(formState.email)}
        value={formState.email}
        errorMessage={getSignupErrorMessage("email")}
        shoulRemoveAditionalSpaces={true}
        placeholder="Email*"
        onChange={changeFormStateHandler}
      />
      <FormInput
        type="password"
        id="senha"
        isInputValid={userFormValidations.senha(formState.senha)}
        value={formState.senha}
        errorMessage={getSignupErrorMessage("senha")}
        placeholder="Senha*"
        onChange={changeFormStateHandler}
      />
      <FormInput
        type="password"
        id="senha_confirmada"
        isInputValid={userFormValidations.senha_confirmada(formState.senha, formState.senha_confirmada)}
        value={formState.senha_confirmada}
        errorMessage={getSignupErrorMessage("senha_confirmada")}
        placeholder="Confirme a senha*"
        onChange={changeFormStateHandler}
      />
      <p>Preencha os campos obrigatórios marcados com *.</p>
      <SignupFormActions onBack={onBack} disabled={!canSubmit} />
    </Wrapper>
  );
};

export default SignUpForm;
