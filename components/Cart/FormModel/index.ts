import IEndereco from "@models/endereco";
import { TipoCupom } from "@models/cupom";
import { TipoEntrega } from "@models/pedido";
import { getCartFormInitialValues } from "./initialValues";
import { useCartFormValidationSchema } from "./validationSchema";

type CartCupom = {
  id_cupom: number;
  valor_desconto: number;
  codigo_cupom: string;
  tipo_cupom: TipoCupom;
};

export type CartFormValues = {
  delivery_type: TipoEntrega | null;
  needChange: boolean | null;
  address_id: IEndereco["id_endereco"] | null;
  payment_type: TipoEntrega | null;
  payment_amount: string;
  delivery_price: number | null;
  cupom: CartCupom | null;
};

export { getCartFormInitialValues, useCartFormValidationSchema };
