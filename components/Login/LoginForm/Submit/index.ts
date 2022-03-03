import type { ILoginFormValues } from "../FormModel";

type LoginFormArg = {
  email: string;
  password: string;
};

export function getLoginFormArg(values: ILoginFormValues): LoginFormArg {
  return {
    email: values.email,
    password: values.password,
  };
}
