import Sabor from "./sabor";
import Desconto from "./desconto";
import Adicional from "./adicional";
import Categoria from "./categoria";
import PedidoProduto from "./pedido_produto";

type Product = {
  id_produto: number;
  preco_padrao: number;
  nome: string;
  imagem?: Blob | null;
  disponivel: boolean;
  descricao: string | null;
  tamanho: string;
  qtde_max_sabor: number | null;
  id_categoria: Categoria["id_categoria"];
  id_desconto?: Desconto["id_desconto"] | null;
};

type ProductCategory = Pick<Categoria, "id_categoria"> & {
  desconto: ProductDiscount | null;
};

export type ProductDiscount = Pick<Desconto, "id_desconto" | "porcentagem_desconto">;

export type ProdutoWithoutImage = Omit<Product, "imagem">;

export type CartProduto = Pick<PedidoProduto, "id_produto" | "observacao" | "quantidade"> & {
  adicionais: Adicional["id_adicional"][];
  sabores: Sabor["id_sabor"][];
};

export type RelatedProduct = Omit<
  Product,
  "imagem" | "id_categoria" | "id_desconto" | "disponivel"
> & {
  desconto: ProductDiscount | null;
  categoria: ProductCategory;
  adicionais: Adicional[];
  sabores: Sabor[];
};

export default Product;
