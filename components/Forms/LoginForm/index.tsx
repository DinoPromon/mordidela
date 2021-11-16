import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

import Wrapper from "../styled";
import LoginFormActions from "./LoginFormActions";
import FormRequestStatus from "@components/shared/FormRequestStatus";
import { loginFormValidations } from "@utils/validations";
import { getLoginErrorMessage } from "@utils/error-message";
import { FormInput } from "@components/shared";
import { LoginFormData } from "@my-types/login";

const initialLoginData: LoginFormData = Object.freeze({
  email: "",
  senha: "",
});

const LoginForm: React.FC = (props) => {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormData>(initialLoginData);
  const [request, setRequest] = useState({ error: "", isLoading: false, success: false });
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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequest({ ...request, isLoading: true });
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formState.email,
        senha: formState.senha,
      });

      console.log(result, formState.email, formState.senha);

      if (!result || result.error) {
        throw new Error(result ? result.error : "Não foi possível realizar o login.");
      }

      setRequest({ isLoading: false, success: true, error: "" });

      const timer = setTimeout(() => {
        router.replace("/");
        return () => clearTimeout(timer);
      }, 2000);
    } catch (e) {
      const error = e as Error;
      setRequest({ isLoading: false, success: false, error: error.message });
    }
  };

  useEffect(() => {
    setCanSubmit(!hasErrorInIputs(formState));
  }, [formState]);

  const shouldShowRequestStatus = request.isLoading || request.error || request.success;

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
        <FormRequestStatus
          errorMessage={request.error}
          isLoading={request.isLoading}
          successMessage={request.success ? "Logado com sucesso. Redirecionando para página inicial" : ""}
        />
      )}

      <LoginFormActions disabled={!canSubmit} />
    </Wrapper>
  );
};

export default LoginForm;
