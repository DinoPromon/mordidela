import { Adicional } from "./database/models/adicional";
import { Sabor } from "./database/models/sabor";

export type CartProduct = {
  id: string,
  quantity: number,
  size: string,
  name: string,
  price: number
  adds: Adicional[],
  flavors: Sabor[],
}

export type CartContextState = {
  delivery_price: number,
  id_cupom?: string,
  products: CartProduct[]
};