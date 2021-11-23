import { Produto } from "./database/models/produto";

export type Product = Omit<Produto, "preco_padrao" | "descricao" | "tamanho" | "imagem">;

export type Add = {
  id_adicional: string;
  nome: string;
  preco: number;
};

export type Flavor = {
  id_sabor: string;
  nome: string;
};

export type Size = {
  id_produto: string;
  preco_padrao: number;
  tamanho: string;
};

export type ProductOptions = {
  adicional: Add[];
  sabor: Flavor[];
  tamanho: Size[];
};

export type ProductInfo = Pick<Produto, "nome" | "descricao" | "qtde_max_sabor">

