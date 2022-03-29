import type ISabor from "./sabor";
import type IDesconto from "./desconto";
import type IAdicional from "./adicional";
import type ICategoria from "./categoria";
import type IPedidoProduto from "./pedido_produto";

interface IProduto {
  id_produto: number;
  uuid: string;
  nome_imagem: string | null;
  preco_padrao: number;
  nome: string;
  disponivel: boolean;
  descricao: string | null;
  tamanho: string | null;
  qtde_max_sabor: number | null;
  id_categoria: ICategoria["id_categoria"] | null;
  id_desconto: IDesconto["id_desconto"] | null;
}

export type ProductCategory = Pick<ICategoria, "id_categoria" | "nome"> & {
  desconto: ProductDiscount | null;
};

export type ProductDiscount = Pick<IDesconto, "id_desconto" | "porcentagem_desconto">;

export type CartProduto = Pick<IPedidoProduto, "id_produto" | "observacao" | "quantidade"> & {
  adicionais: IAdicional["id_adicional"][];
  sabores: ISabor["id_sabor"][];
};

export type RelatedProduct = Omit<IProduto, "id_categoria" | "id_desconto" | "disponivel"> & {
  desconto: ProductDiscount | null;
  categoria: ProductCategory | null;
  adicionais: IAdicional[];
  sabores: ISabor[] | null;
};

export type ProductCreate = Omit<IProduto, "id_produto" | "uuid" | "nome_imagem"> & {
  adicionais?: number[];
  sabores?: number[];
};

export default IProduto;
