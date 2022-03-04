import React, { useState, Fragment } from "react";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";

import { maskDate } from "@utils/formatters";
import { SignupFormActionsContainer } from "./styled";
import { SignupImageContainer } from "../styled";
import { InputTextFormik } from "@components/shared";
import { phoneNumberChangeHandler } from "@utils/formatters";

import type { SetFieldValue } from "@my-types/formik";
import type { ISignUpFormValues, SignupCompleteFormModel } from "../FormModel";

type SignupFormProps = {
  isValid: boolean;
  isTouched: boolean;
  formikValues: ISignUpFormValues;
  formModel: SignupCompleteFormModel;
  onBack: () => void;
  onNext: () => void;
  setFieldValue: SetFieldValue<ISignUpFormValues>;
};

const SignUpForm: React.FC<SignupFormProps> = ({
  isValid,
  isTouched,
  formModel,
  formikValues,
  onBack,
  onNext,
  setFieldValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  function changeShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  function phoneInputChangeHandler(
    values: ISignUpFormValues,
    setFieldValue: SetFieldValue<ISignUpFormValues>,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const formatedPhoneInput = phoneNumberChangeHandler(event.target.value, values.phoneNumber);
    setFieldValue("phoneNumber", formatedPhoneInput);
  }

  function dateInputChangeHandler(
    setFieldValue: SetFieldValue<ISignUpFormValues>,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const formatedDate = maskDate(event.target.value);
    setFieldValue("birthDate", formatedDate);
  }

  return (
    <Fragment>
      <SignupImageContainer>
        <Image
          src={"/images/profile_pic.svg"}
          alt="Ícone de criação de perfil"
          layout="fill"
          objectFit="scale-down"
        />
      </SignupImageContainer>
      <InputTextFormik
        name={formModel.name.name}
        label={formModel.name.label}
        value={formikValues.name}
        variant="outlined"
        helperText={formModel.name.requiredErrorMessage}
      />
      <InputTextFormik
        name={formModel.birthDate.name}
        label={formModel.birthDate.label}
        value={formikValues.birthDate}
        variant="outlined"
        helperText={formModel.birthDate.requiredErrorMessage}
        onChange={dateInputChangeHandler.bind(null, setFieldValue)}
      />
      <InputTextFormik
        name={formModel.phoneNumber.name}
        label={formModel.phoneNumber.label}
        value={formikValues.phoneNumber}
        variant="outlined"
        helperText={formModel.phoneNumber.requiredErrorMessage}
        onChange={phoneInputChangeHandler.bind(null, formikValues, setFieldValue)}
      />
      <InputTextFormik
        name={formModel.email.name}
        label={formModel.email.label}
        value={formikValues.email}
        variant="outlined"
        helperText={formModel.email.requiredErrorMessage}
      />
      <InputTextFormik
        name={formModel.password.name}
        label={formModel.password.label}
        value={formikValues.password}
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
        value={formikValues.confirmedPassword}
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

      <SignupFormActionsContainer>
        <Button onClick={onBack} variant="contained" color="secondary">
          Voltar
        </Button>
        <Button
          onClick={onNext}
          variant="contained"
          color="secondary"
          disabled={!(isValid && isTouched)}
        >
          Próximo
        </Button>
      </SignupFormActionsContainer>
    </Fragment>
  );
};

export default SignUpForm;
