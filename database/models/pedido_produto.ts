import IPedido from "./pedido";
import Produto from "./produto";

interface IPedidoProduto {
  id_pedido: IPedido["id_pedido"];
  id_produto: Produto["id_produto"];
  quantidade: number;
  preco_pedido: number;
  observacao: string | null;
};

export type CartOrderProduct = Omit<IPedidoProduto, "preco_pedido">;

export default IPedidoProduto;
