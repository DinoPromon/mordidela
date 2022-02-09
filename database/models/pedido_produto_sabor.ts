import IPedido from "./pedido";
import Produto from "./produto";
import ISabor from "./sabor";

interface IPedidoProdutoSabor {
  id_pedido: IPedido["id_pedido"];
  id_produto: Produto["id_produto"];
  id_sabor: ISabor["id_sabor"];
}

export default IPedidoProdutoSabor;
