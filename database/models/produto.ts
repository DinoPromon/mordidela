import Categoria from "./categoria";
import Desconto from "./desconto";

type Produto = {
  id_produto: string;
  preco_padrao: number;
  nome: string;
  imagem: string;
  disponivel: boolean;
  descricao: string;
  tamanho: string;
  qtde_max_sabor: number;
  id_categoria: Pick<Categoria, "id_categoria">;
  id_desconto: Pick<Desconto, "id_desconto"> | null;
};

export default Produto;