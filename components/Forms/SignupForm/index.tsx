import React, { useEffect, useState } from "react";

import SignupFormActions from "./SignupFormActions";
import { FormInput, InputTextFormik } from "@components/shared";
import { userFormValidations } from "@utils/validations";
import { getSignupErrorMessage } from "@utils/error-message";
import { dateChangeHandler, phoneNumberChangeHandler } from "@utils/formatters";

import type { UserFormData } from "@my-types/forms";

import { Formik } from "formik";
import { FormikForm } from "../styled";
import {
  getSignUpFormModel,
  getSignUpFormValidationSchema,
  getSignUpInitialValues,
} from "./FormModel";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";
import type { SetFieldValue } from "@my-types/formik";
import type { ISignUpFormValues } from "./FormModel";
import { maskDate } from "@utils/formatters";


type Props = {
  state: UserFormData;
  setState: React.Dispatch<React.SetStateAction<UserFormData>>;
  onBack: () => void;
  onSubmit: () => void;
};

const SignUpForm: React.FC<Props> = (props) => {
  const { state: formState, setState: setFormState, onBack, onSubmit } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  function changeShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  function phoneInputChangeHandler(
    values: ISignUpFormValues,
    setFieldValue: SetFieldValue<ISignUpFormValues>,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const formatedPhoneInput = phoneNumberChangeHandler(event.target.value, values.phoneNumber);
    setFieldValue(formModel.phoneNumber.name, formatedPhoneInput);
  }

  function dateInputChangeHandler(
    setFieldValue: SetFieldValue<ISignUpFormValues>,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const formatedDate = maskDate(event.target.value);
    setFieldValue(formModel.birthDate.name, formatedDate);
  }

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
    if (id === "data_nascimento")
      event.target.value = dateChangeHandler(event.target.value, formState[id]);
    else if (id === "telefone")
      event.target.value = phoneNumberChangeHandler(event.target.value, formState[id]);
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

  const formModel = getSignUpFormModel();

  return (
    <Formik
      validateOnChange={false}
      enableReinitialize={true}
      validationSchema={getSignUpFormValidationSchema(formModel)}
      initialValues={getSignUpInitialValues()}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, setFieldValue }) => (
        <FormikForm>
          <InputTextFormik
            name={formModel.name.name}
            label={formModel.name.label}
            value={values.name}
            variant="outlined"
            helperText={formModel.name.requiredErrorMessage}
          />
          <InputTextFormik
            name={formModel.birthDate.name}
            label={formModel.birthDate.label}
            value={values.birthDate}
            variant="outlined"
            helperText={formModel.birthDate.requiredErrorMessage}
            onChange={dateInputChangeHandler.bind(null, setFieldValue)}
          />
          <InputTextFormik
            name={formModel.phoneNumber.name}
            label={formModel.phoneNumber.label}
            value={values.phoneNumber}
            variant="outlined"
            helperText={formModel.phoneNumber.requiredErrorMessage}
            onChange={phoneInputChangeHandler.bind(null, values, setFieldValue)}
          />
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
          <InputTextFormik
            name={formModel.confirmedPassword.name}
            label={formModel.confirmedPassword.label}
            value={values.confirmedPassword}
            variant="outlined"
            helperText={formModel.confirmedPassword.requiredErrorMessage}
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
          <p>Preencha os campos obrigatórios marcados com *</p>
          <SignupFormActions onBack={onBack} disabled={!canSubmit} />
        </FormikForm>
      )}
    </Formik>
  );
  /*   return (
    <FormikForm >
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
        isInputValid={userFormValidations.senha_confirmada(
          formState.senha,
          formState.senha_confirmada
        )}
        value={formState.senha_confirmada}
        errorMessage={getSignupErrorMessage("senha_confirmada")}
        placeholder="Confirme a senha*"
        onChange={changeFormStateHandler}
      />
      <p>Preencha os campos obrigatórios marcados com *</p>
      <SignupFormActions onBack={onBack} disabled={!canSubmit} />
    </FormikForm>
  ); */
};

export default SignUpForm;
