import type ISabor from "./sabor";
import type IProduto from "./produto";

interface IProdutoSabor {
  id_produto: IProduto["id_produto"];
  id_sabor: ISabor[];
}

export default IProdutoSabor;
