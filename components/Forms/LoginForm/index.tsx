import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

import Wrapper from "../styled";
import LoginFormActions from "./LoginFormActions";
import FormRequestStatus from "@components/shared/FormRequestStatus";
import { FormInput } from "@components/shared";
import { LoginFormData } from "@my-types/login";
import { RequestState } from "@my-types/request";
import { loginFormValidations } from "@utils/validations";
import { getLoginErrorMessage } from "@utils/error-message";

const initialLoginData: LoginFormData = {
  email: "",
  senha: "",
};

const LoginForm: React.FC = (props) => {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormData>(initialLoginData);
  const [request, setRequest] = useState<RequestState>({ error: "", isLoading: false });
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
    if (request.error) setRequest({ ...request, error: "" });
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
      setRequest({ ...request, isLoading: true });
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: formState.email,
          senha: formState.senha,
        });

        if (!result || result.error) {
          throw new Error(result ? result.error : "Não foi possível realizar o login.");
        }

        router.replace("/");
      } catch (e) {
        const error = e as Error;
        setRequest({ isLoading: false, error: error.message });
      }
    }
  };

  useEffect(() => {
    setCanSubmit(!hasErrorInIputs(formState));
  }, [formState]);

  const shouldShowRequestStatus = request.isLoading || request.error;

  return (
    <Wrapper onSubmit={submitHandler}>
      <FormInput
        type="text"
        id="email"
        isInputValid={loginFormValidations.email(formState.email)}
        value={formState.email}
        onChange={changeHandler}
        errorMessage={getLoginErrorMessage("email")}
        shoulRemoveAditionalSpaces={true}
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
      {shouldShowRequestStatus && (
        <FormRequestStatus errorMessage={request.error} isLoading={request.isLoading} />
      )}
      <LoginFormActions disabled={!canSubmit} />
    </Wrapper>
  );
};

export default LoginForm;
