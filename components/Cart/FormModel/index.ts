import IEndereco from "@models/endereco";
import { CupomType } from "@constants/cupom-type";
import { getCartFormInitialValues } from "./initialValues";
import { useCartFormValidationSchema } from "./validationSchema";

type CartCupom = {
  id_cupom: number;
  valor_desconto: number;
  codigo_cupom: string;
  tipo_cupom: CupomType;
};

export type CartFormValues = {
  delivery_type: string | null;
  needChange: boolean | null;
  address_id: IEndereco["id_endereco"] | null;
  payment_type: string | null;
  payment_amount: string;
  delivery_price: number | null;
  cupom: CartCupom | null;
};

export { getCartFormInitialValues, useCartFormValidationSchema };
