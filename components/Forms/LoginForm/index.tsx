import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

import { Wrapper } from "../styled";

import type { RequestState } from "@my-types/request";
import LoginFormActions from "./LoginFormActions";

import { Formik } from "formik";
import { InputTextFormik } from "@components/shared";
import { FormikForm } from "../styled";
import {
  getLoginFormInitialValues,
  getLoginFormModel,
  getLoginFormValidationSchema,
} from "./FormModel";
import { IconButton, InputAdornment } from "@material-ui/core";

const LoginForm: React.FC = (props) => {
  const router = useRouter();
  const [request, setRequest] = useState<RequestState>({ error: "", isLoading: false });
  const [canSubmit, setCanSubmit] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
      setRequest({ ...request, isLoading: true });
      try {
        const result = await signIn("credentials", {
          redirect: false,
          /*           email: formState.email,
          senha: formState.senha, */
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

  /*   const shouldShowRequestStatus = request.isLoading || request.error; */

  const formModel = getLoginFormModel();

  return (
    <Formik
      validateOnChange={false}
      enableReinitialize={true}
      validationSchema={getLoginFormValidationSchema(formModel)}
      initialValues={getLoginFormInitialValues()}
      onSubmit={(values) => console.log(values)}
    >
      {({ values }) => (
        <FormikForm>
          <InputTextFormik
            name={formModel.email.name}
            label={formModel.email.label}
            value={values.email}
            variant="outlined"
            helperText={formModel.email.requiredErrorMessage}
          />
          <InputTextFormik
            name={formModel.password.name}
            label={formModel.password.label}
            value={values.password}
            variant="outlined"
            helperText={formModel.password.requiredErrorMessage}
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  
                </IconButton>
              </InputAdornment>
            }
          />
          <LoginFormActions disabled={!canSubmit} />
        </FormikForm>
        
      )}
    </Formik>
  );
  {
    /*       <FormInput
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
      <LoginFormActions disabled={!canSubmit} /> */
  }
};

export default LoginForm;
