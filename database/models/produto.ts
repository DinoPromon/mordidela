import Sabor from "./sabor";
import Desconto from "./desconto";
import Adicional from "./adicional";
import Categoria from "./categoria";
import PedidoProduto from "./pedido_produto";

type Produto = {
  id_produto: number;
  preco_padrao: number;
  nome: string;
  imagem?: Blob | null;
  disponivel: boolean;
  descricao?: string | null;
  tamanho: string;
  qtde_max_sabor?: number | null;
  id_categoria: Categoria["id_categoria"];
  id_desconto?: Desconto["id_desconto"] | null;
};

export type ProdutoWithoutImage = Omit<Produto, "imagem">;

export type MenuProduct = { adds: Adicional[]; flavors: Sabor[] } & ProdutoWithoutImage;

export type CartProduto = Pick<PedidoProduto, "id_produto" | "observacao" | "quantidade"> & {
  adicionais: Adicional["id_adicional"][] | Adicional["id_adicional"];
  sabores: Sabor["id_sabor"][] | Sabor['id_sabor'];
};

export default Produto;
