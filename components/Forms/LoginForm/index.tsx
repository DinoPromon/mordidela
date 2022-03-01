import React, { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import { FormikForm } from "../styled";
import { getLoginFormArg } from "./Submit";
import { InputTextFormik } from "@components/shared";
import { ForgotPasswordText, LoginActionsContainer } from "./styled";
import {
  getLoginFormInitialValues,
  getLoginFormModel,
  getLoginFormValidationSchema,
} from "./FormModel";

import type { ILoginFormValues } from "./FormModel";
import type { RequestState } from "@my-types/request";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [request, setRequest] = useState<RequestState>({ error: "", isLoading: false });

  const loginSubmitHandler = async (values: ILoginFormValues) => {
    setRequest({ ...request, isLoading: true });
    try {
      const loginFormArgs = getLoginFormArg(values);
      const result = await signIn("credentials", {
        redirect: false,
        email: loginFormArgs.email,
        password: loginFormArgs.password,
      });

      if (!result || result.error) {
        throw new Error(result ? result.error : "Não foi possível realizar o login.");
      }

      router.replace("/");
    } catch (e) {
      const error = e as Error;
      setRequest({ isLoading: false, error: error.message });
    }
  };

  /*   const shouldShowRequestStatus = request.isLoading || request.error; */

  const formModel = getLoginFormModel();

  return (
    <Formik
      validateOnMount
      enableReinitialize
      validateOnChange={false}
      validationSchema={getLoginFormValidationSchema(formModel)}
      initialValues={getLoginFormInitialValues()}
      onSubmit={loginSubmitHandler}
    >
      {({ values, dirty, isValid }) => (
        <FormikForm>
          {console.log(isValid, dirty)}
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
                <IconButton edge="end"></IconButton>
              </InputAdornment>
            }
          />
          <LoginActionsContainer>
            <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!(isValid && dirty)}
            >
              Enviar
            </Button>
          </LoginActionsContainer>
        </FormikForm>
      )}
    </Formik>
  );
};

export default LoginForm;
