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
  deliveryType: TipoEntrega | null;
  needChange: boolean | null;
  addressId: IEndereco["id_endereco"] | null;
  paymentType: TipoPagamento | null;
  paymentAmount: string;
  deliveryPrice: number | null;
  coupon: CartCupom | null;
};

export { getCartSubmitData } from "./submit";
export { getCartFormInitialValues } from "./initialValues";
export { useCartFormValidationSchema } from "./validationSchema";
