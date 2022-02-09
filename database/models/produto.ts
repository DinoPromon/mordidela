import ISabor from "./sabor";
import IDesconto from "./desconto";
import IAdicional from "./adicional";
import ICategoria from "./categoria";
import IPedidoProduto from "./pedido_produto";

interface IProduto {
  id_produto: number;
  preco_padrao: number;
  nome: string;
  imagem: Blob | null;
  disponivel: boolean;
  descricao: string | null;
  tamanho: string;
  qtde_max_sabor: number | null;
  id_categoria: ICategoria["id_categoria"];
  id_desconto: IDesconto["id_desconto"] | null;
}

export type ProductCategory = Pick<ICategoria, "id_categoria" | "nome"> & {
  desconto: ProductDiscount | null;
};

export type ProductDiscount = Pick<IDesconto, "id_desconto" | "porcentagem_desconto">;

export type ProdutoWithoutImage = Omit<IProduto, "imagem">;

export type CartProduto = Pick<IPedidoProduto, "id_produto" | "observacao" | "quantidade"> & {
  adicionais: IAdicional["id_adicional"][];
  sabores: ISabor["id_sabor"][];
};

export type RelatedProduct = Omit<
  IProduto,
  "imagem" | "id_categoria" | "id_desconto" | "disponivel"
> & {
  desconto: ProductDiscount | null;
  categoria: ProductCategory;
  adicionais: IAdicional[];
  sabores: ISabor[];
};

export default IProduto;
