import { AddressFormData, UserFormData } from "@my-types/signup";
import { userFormValidations, addressFormValidations } from "@utils/validations";

export const hasErrorInUserForm = (userFormData: UserFormData) => {
  for (const k in userFormData) {
    const key = k as keyof UserFormData;
    const isValid = userFormValidations[key](userFormData[key], userFormData["senha_confirmada"]);
    console.log(isValid, key);
    // se preciso mostrar o campo errado, trocar hasError para key
    if (!isValid) return true;
  }

  return false;
};

export const hasErrorInAddressForm = (addressFormData: AddressFormData) => {
  for (const k in addressFormData) {
    const key = k as keyof AddressFormData;
    const isValid = addressFormValidations[key](addressFormData[key]);
    if (!isValid) return true;
  }

  return false;
};
