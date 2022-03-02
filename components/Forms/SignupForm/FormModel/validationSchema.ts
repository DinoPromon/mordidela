import * as Yup from "yup";

import type { SignUpFormModel } from "./index";
import { phoneValidation } from "@utils/validations";
import { validateDate } from "@components/UserProfile/GeneralData/FormModel/utility";

export function getSignUpFormValidationSchema(formModel: SignUpFormModel) {
  const { name, birthDate, phoneNumber, email, password, confirmedPassword } = formModel;

  const validationSchema = Yup.object().shape({
    [name.name]: Yup.string().required(name.requiredErrorMessage),
    [birthDate.name]: Yup.string()
      .required(birthDate.requiredErrorMessage)
      .test("is-valid-date", `${birthDate.requiredErrorMessage}`, (value) =>
        validateDate(value as string)
      ),
    [phoneNumber.name]: Yup.string()
      .required(phoneNumber.requiredErrorMessage)
      .test("is-phone-valid", "Número de telefone inválido", (value) =>
        phoneValidation(value || "")
      ),
    [email.name]: Yup.string().email("Insira um email válido").required(email.requiredErrorMessage),
    [password.name]: Yup.string()
      .required(password.requiredErrorMessage)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Sua senha deve conter, no mínimo, 8 caracteres, com uma letra maiúscula, uma minúscula, um número e um caractere especial"
      ),
    [confirmedPassword.name]: Yup.string()
      .required(confirmedPassword.requiredErrorMessage)
      .test("Senhas iguais", "As senhas devem ser iguais", function (value) {
        return this.parent.password === value;
      }),
  });

  return validationSchema;
}
