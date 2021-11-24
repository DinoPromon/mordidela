import { Adicional } from "./database/models/adicional";
import { Sabor } from "./database/models/sabor";

export type CartProduct = {
  id: string;
  product_id: string;
  quantity: number;
  size: string;
  name: string;
  standard_price: number;
  adds: Adicional[];
  flavors: Sabor[];
};

export type CartContextState = {
  delivery_price: number;
  id_cupom?: string;
  products: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (product: CartProduct) => void;
  getProductTotalPrice: (id: string) => number | void;
};
