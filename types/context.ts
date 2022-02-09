import IAdicional from "@models/adicional";
import ICupom from "@models/cupom";
import IEndereco from "@models/endereco";
import IPedido from "@models/pedido";
import IPedidoProduto from "@models/pedido_produto";
import Produto from "@models/produto";
import ISabor from "@models/sabor";

export type CartProduct = {
  key: string;
  flavors: ISabor[];
  adds: IAdicional[];
  name: Produto["nome"];
  size: Produto["tamanho"];
  product_id: Produto["id_produto"];
  quantity: IPedidoProduto["quantidade"];
  orderNote?: IPedidoProduto["observacao"];
  standard_price: Produto["preco_padrao"];
  total_price: IPedidoProduto["preco_pedido"];
};

export type CartOrder = {
  tipo_cupom?: ICupom["tipo"];
  address_id: IEndereco["id_endereco"] | null;
  id_cupom?: ICupom["id_cupom"];
  codigo_cupom?: ICupom["codigo"];
  delivery_type: string | null;
  payment_amount: IPedido["troco_para"];
  valor_desconto?: ICupom["valor_desconto"];
  delivery_price: IPedido["preco_entrega"];
  payment_type: string | null;
};

export type CartContextState = {
  products: CartProduct[];
  order: CartOrder;
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (key: string) => void;
  changeDeliveryPrice: (price: number) => void;
  removeCupom: () => void;
  setAddressId: (addressId: IEndereco["id_endereco"] | null) => void;
  setCupom: (cupom: Partial<ICupom>) => void;
  setDeliveryType: (type: CartOrder["delivery_type"]) => void;
  setPaymentType: (type: string | null) => void;
  setPaymentAmount: (amount: CartOrder["payment_amount"]) => void;
  setDeliveryPrice: (deliveryPrice: IPedido["preco_entrega"]) => void;
  resetCart: () => void;
};
