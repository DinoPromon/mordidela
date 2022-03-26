import type { IAdditionalFormValues } from "./index";

export function getAdditionalFormInitialValues(): IAdditionalFormValues {
  return {
    name: "",
    value: null,
  };
}
