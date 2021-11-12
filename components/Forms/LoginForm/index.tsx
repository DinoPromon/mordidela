import React, { useState, useEffect } from "react";

import Wrapper from "../styled";
import LoginFormActions from "./LoginFormActions";
import { loginFormValidations } from "@utils/validations";
import { getLoginErrorMessage } from "@utils/error-message";
import { FormInput } from "@components/shared";
import { LoginFormData } from "@my-types/login";

type Props = {
  state: LoginFormData;
  setState: React.Dispatch<React.SetStateAction<LoginFormData>>;
};

const LoginForm: React.FC<Props> = (props) => {
  const { state: formState, setState: setFormState } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const hasErrorInIputs = (formInputs: LoginFormData) => {
    for (let k in loginFormValidations) {
      const key = k as keyof LoginFormData;
      const isValid = loginFormValidations[key](formInputs[key]);
      if (!isValid) return key;
    }
		return false;
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("todo");
  };

  useEffect(() => {
		setCanSubmit(!hasErrorInIputs(formState));
  }, [formState]);

  return (
    <Wrapper onSubmit={submitHandler}>
      <FormInput
        type="text"
        id="email"
        isInputValid={loginFormValidations.email(formState.email)}
        value={formState.email}
        onChange={changeHandler}
        errorMessage={getLoginErrorMessage("email")}
        placeholder="Email"
      />
      <FormInput
        type="password"
        id="senha"
        isInputValid={loginFormValidations.senha(formState.senha)}
        value={formState.senha}
        onChange={changeHandler}
        errorMessage={getLoginErrorMessage("senha")}
        placeholder="Senha"
      />
      {errorMessage !== "" && <p>{errorMessage}</p>}
      <LoginFormActions disabled={!canSubmit} />
    </Wrapper>
  );
};

export default LoginForm;
