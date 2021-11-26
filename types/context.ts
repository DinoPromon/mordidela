import Adicional from "@models/adicional";
import Sabor from "@models/sabor";

export type CartProduct = {
  key: string;
  product_id: string;
  quantity: number;
  size: string;
  name: string;
  orderNote?: string,
  standard_price: number;
  adds: Adicional[];
  flavors: Sabor[];
};

export type CartContextState = {
  delivery_price: number;
  id_cupom?: string;
  products: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (key: string) => void;
  changeDeliveryPrice: (price: number) => void
};
