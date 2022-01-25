import Pedido from "./pedido";
import Produto from "./produto";

type PedidoProduto = {
  id_pedido: Pedido["id_pedido"];
  id_produto: Produto["id_produto"];
  quantidade: number;
  preco_pedido: number;
  observacao: string | null;
};

export type PedidoProdutoCreate = Omit<PedidoProduto, "preco_pedido">;

export default PedidoProduto;
