import Pedido from "./pedido";
import Produto from "./produto";
import Sabor from "./sabor";

type PedidoProdutoSabor = {
  id_pedido: Pedido["id_pedido"];
  id_produto: Produto["id_produto"];
  id_sabor: Sabor["id_sabor"];
};

export default PedidoProdutoSabor;
