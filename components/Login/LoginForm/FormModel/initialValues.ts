import type { ILoginFormValues } from "./index";

export function getLoginFormInitialValues(): ILoginFormValues {
  return {
    email: "",
    password: "",
  };
}