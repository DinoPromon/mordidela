import Endereco from "@models/endereco";
import { getCartFormInitialValues } from "./initialValues";
import { useCartFormValidationSchema } from "./validationSchema";

export type CartFormValues = {
  delivery_type: string | null;
  needChange: boolean | null;
  address_id: Endereco["id_endereco"] | null;
  payment_type: string | null;
  payment_amount: string;
  cupom_id: string | null;
};

export { getCartFormInitialValues, useCartFormValidationSchema };
