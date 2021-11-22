import { Categoria } from "./categoria";
import { Desconto } from "./desconto";

export type Produto = {
  id_produto: string;
  preco_padrao: number;
  nome: string;
  imagem: string;
  disponivel: boolean;
  descricao: string;
  tamanho: string;
  qtde_max_sabor: number;
} & Pick<Categoria, "id_categoria"> &
  Partial<Pick<Desconto, "id_desconto">>;
