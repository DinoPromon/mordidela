import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";

import { FormikForm } from "../styled";
import { getLoginFormArg } from "./Submit";
import { InputTextFormik } from "@components/shared";
import { ForgotPasswordText, LoginActionsContainer } from "./styled";
import {
  getLoginFormInitialValues,
  getLoginFormModel,
  getLoginFormValidationSchema,
} from "./FormModel";

import type { AxiosError } from "axios";
import type { ILoginFormValues } from "./FormModel";
import type { RequestState } from "@my-types/request";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const formModel = getLoginFormModel();
  const [showPassword, setShowPassword] = useState(false);
  const [requestStatus, setRequestStatus] = useState<RequestState>({ error: "", isLoading: false });

  function changeShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  async function loginSubmitHandler(values: ILoginFormValues) {
    setRequestStatus({ error: "", isLoading: true });
    try {
      const loginFormArgs = getLoginFormArg(values);
      const result = await signIn("credentials", {
        redirect: false,
        email: loginFormArgs.email,
        password: loginFormArgs.password,
      });

      if (!result || result.error) {
        throw new Error(result ? result.error : "Não foi possível realizar o login");
      }

      router.replace("/");
    } catch (e) {
      const error = e as AxiosError;
      setRequestStatus({ error: error.response?.data.message, isLoading: false });
    }
    setRequestStatus((prevState) => ({ ...prevState, isLoading: false }));
  }

  return (
    <Formik
      validateOnMount
      enableReinitialize
      validateOnChange
      validationSchema={getLoginFormValidationSchema(formModel)}
      initialValues={getLoginFormInitialValues()}
      onSubmit={loginSubmitHandler}
    >
      {({ values, dirty, isValid }) => (
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
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={changeShowPassword}>
                    {showPassword ? (
                      <AiFillUnlock size={22} color="black" />
                    ) : (
                      <AiFillLock size={22} color="black" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoginActionsContainer>
            <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!(isValid && dirty) || requestStatus.isLoading}
            >
              {requestStatus.isLoading ? <CircularProgress color="primary" size={24} /> : "Login"}
            </Button>
          </LoginActionsContainer>
        </FormikForm>
      )}
    </Formik>
  );
};

export default LoginForm;
