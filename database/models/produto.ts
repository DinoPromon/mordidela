import Categoria from "./categoria";
import Desconto from "./desconto";

type Produto = {
  id_produto: string;
  preco_padrao: number;
  nome: string;
  imagem: string | null;
  disponivel: boolean;
  descricao: string | null;
  tamanho: string;
  qtde_max_sabor: number | null;
  id_categoria: Categoria["id_categoria"];
  id_desconto: Desconto["id_desconto"] | null;
};

export default Produto;
