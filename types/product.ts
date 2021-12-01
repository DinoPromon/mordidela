import Produto from "@models/produto";

export type Product = Omit<Produto, "qtde_max_sabor" | "descricao" | "imagem">;

export type Add = {
  id_adicional: string;
  nome: string;
  preco: number;
};

export type Flavor = {
  id_sabor: string;
  nome: string;
};

export type ProductOptions = {
  adicional: Add[];
  sabor: Flavor[];
};

export type ProductInfo = Pick<
  Produto,
  "nome" | "descricao" | "qtde_max_sabor" | "preco_padrao" | "id_produto" | "tamanho"
>;
