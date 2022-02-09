import Produto from "./produto";
import ISabor from "./sabor";

interface IProdutoSabor {
  id_produto: Produto['id_produto'];
  id_sabor: ISabor[]
};

export default IProdutoSabor;
