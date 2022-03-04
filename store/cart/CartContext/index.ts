import { createContext } from "react";
import { CartContextState, CartOrder, CartProduct } from "@my-types/context";
import ICupom from "@models/cupom";
import IPedido from "@models/pedido";
import IEndereco from "@models/endereco";

export const orderInitialState: CartOrder = {
  address_id: null,
  delivery_type: null,
  payment_type: null,
  payment_amount: 0,
  delivery_price: 0,
};

const CartContext = createContext({
  products: [],
  order: orderInitialState,
  addProductToCart(product: CartProduct) {},
  removeProductFromCart(key: string) {},
  getProductTotalPrice(id: string): number | void {},
  changeDeliveryPrice(price: number) {},
  removeCupom() {},
  setAddressId(id: IEndereco["id_endereco"]) {},
  setPaymentAmount(amount: CartOrder["payment_amount"]) {},
  setCupom(cupom: Partial<ICupom>) {},
  setDeliveryType(type: CartOrder["delivery_type"]) {},
  setPaymentType(type: string | null) {},
  setDeliveryPrice(deliveryPrice: IPedido["preco_entrega"]) {},
  resetCart() {},
} as CartContextState);

export default CartContext;
