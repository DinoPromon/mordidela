import Adicional from "@models/adicional";
import Cupom from "@models/cupom";
import Endereco from "@models/endereco";
import Pedido from "@models/pedido";
import PedidoProduto from "@models/pedido_produto";
import Produto from "@models/produto";
import Sabor from "@models/sabor";

export type CartProduct = {
  key: string;
  flavors: Sabor[];
  adds: Adicional[];
  name: Produto["nome"];
  size: Produto["tamanho"];
  product_id: Produto["id_produto"];
  quantity: PedidoProduto["quantidade"];
  orderNote?: PedidoProduto["observacao"];
  standard_price: Produto["preco_padrao"];
  total_price: PedidoProduto["preco_pedido"];
};

export type CartOrder = {
  tipo_cupom?: Cupom["tipo"];
  address_id: Endereco["id_endereco"] | null;
  id_cupom?: Cupom["id_cupom"];
  codigo_cupom?: Cupom["codigo"];
  order_type: Pedido["tipo_entrega"] | null;
  payment_amount?: Pedido["troco_para"];
  valor_desconto?: Cupom["valor_desconto"];
  delivery_price?: Pedido["preco_entrega"];
  payment_type?: Pedido["tipo_pagamento"];
};

export type CartContextState = {
  products: CartProduct[];
  order: CartOrder;
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (key: string) => void;
  changeDeliveryPrice: (price: number) => void;
  removeCupom: () => void;
  setAddressId: (addressId: Endereco["id_endereco"]) => void;
  setCupom: (cupom: Partial<Cupom>) => void;
  setOrderType: (type: CartOrder["order_type"]) => void;
  setPaymentType: (type: CartOrder["payment_type"]) => void;
  setPaymentAmount: (amount: CartOrder["payment_amount"]) => void;
  resetCart: () => void;
};
