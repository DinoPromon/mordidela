import Adicional from "@models/adicional";
import Cupom from "@models/cupom";
import Pedido from "@models/pedido";
import PedidoProduto from "@models/pedido_produto";
import Produto from "@models/produto";
import Sabor from "@models/sabor";
import Usuario from "@models/usuario";

export type CartProduct = {
  key: string;
  product_id: Produto["id_produto"];
  size: Produto["tamanho"];
  name: Produto["nome"];
  quantity: PedidoProduto["quantidade"];
  orderNote?: PedidoProduto["observacao"];
  standard_price: Produto["preco_padrao"];
  total_price: PedidoProduto["preco_pedido"];
  adds: Adicional[];
  flavors: Sabor[];
};

export type CartOrder = {
  id_cupom?: Cupom["id_cupom"];
  delivery_price?: Pedido["preco_entrega"];
  order_type?: Pedido["tipo_entrega"];
  payment_type?: Pedido["tipo_pagamento"];
  payment_amount?: Pedido["troco_para"];
};

export type CartContextState = {
  products: CartProduct[];
  order: CartOrder;
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (key: string) => void;
  changeDeliveryPrice: (price: number) => void;
  setCupom: (id: CartOrder["id_cupom"]) => void;
  setOrderType: (type: CartOrder["order_type"]) => void;
  setPaymentType: (type: CartOrder["payment_type"]) => void;
  setPaymentAmount: (amount: CartOrder["payment_amount"]) => void;
};
