import * as Yup from "yup";
import validator from "validator";

import { phoneValidation } from "@utils/validations";

import type { SignupCompleteFormModel } from "./index";

export function getSignupCompleteValidationSchema(formModel: SignupCompleteFormModel) {
  const validationSchema = Yup.object().shape({
    [formModel.isAddressForm.name]: Yup.boolean().required(),
    [formModel.address.name]: Yup.string().when("isAddressForm", {
      is: true,
      then: Yup.string().required(formModel.address.requiredErrorMessage),
      otherwise: Yup.string(),
    }),
    [formModel.number.name]: Yup.string().when("isAddressForm", {
      is: true,
      then: Yup.string().required(formModel.number.requiredErrorMessage),
      otherwise: Yup.string(),
    }),
    [formModel.neighborhood.name]: Yup.string().when("isAddressForm", {
      is: true,
      then: Yup.string().required(formModel.neighborhood.requiredErrorMessage),
      otherwise: Yup.string(),
    }),
    [formModel.complement.name]: Yup.string(),
    [formModel.name.name]: Yup.string().required(formModel.name.requiredErrorMessage),
    [formModel.birthDate.name]: Yup.string()
      .required(formModel.birthDate.requiredErrorMessage)
      .test("is-valid-date", `${formModel.birthDate.requiredErrorMessage}`, (value) =>
        validator.isDate(value || "", { format: "DD/MM/YYYY", strictMode: true })
      ),
    [formModel.phoneNumber.name]: Yup.string()
      .required(formModel.phoneNumber.requiredErrorMessage)
      .test("is-phone-valid", "Número de telefone inválido", (value) =>
        phoneValidation(value || "")
      ),
    [formModel.email.name]: Yup.string()
      .email("Insira um email válido")
      .required(formModel.email.requiredErrorMessage),
    [formModel.password.name]: Yup.string()
      .required(formModel.password.requiredErrorMessage)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Sua senha deve conter, no mínimo, 8 caracteres, com uma letra maiúscula, uma minúscula, um número e um caractere especial"
      ),
    [formModel.confirmedPassword.name]: Yup.string()
      .required(formModel.confirmedPassword.requiredErrorMessage)
      .oneOf([Yup.ref(formModel.password.name)], "As senhas devem ser iguais"),
  });

  return validationSchema;
}
