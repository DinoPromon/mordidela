import type IEndereco from "@models/endereco";
import type { TipoCupom } from "@models/cupom";
import type { TipoEntrega, TipoPagamento } from "@models/pedido";

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
  payment_type: TipoPagamento | null;
  payment_amount: string;
  delivery_price: number | null;
  cupom: CartCupom | null;
};

export { getCartSubmitData } from "./submit";
export { getCartFormInitialValues } from "./initialValues";
export { useCartFormValidationSchema } from "./validationSchema";
