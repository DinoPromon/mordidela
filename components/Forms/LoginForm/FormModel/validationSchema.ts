import * as Yup from 'yup';

import type { LoginFormModel } from './index';

export function getLoginFormValidationSchema(formModel: LoginFormModel) {
  const {email, password} = formModel;

  const validationSchema = Yup.object().shape({
    [email.name]: Yup.string().email("Verifique seu email").required(email.requiredErrorMessage),
    [password.name]: Yup.string().required(password.requiredErrorMessage),
  });

  return validationSchema;
}