import Produto from "@models/produto";

export type Product = Omit<Produto, "imagem">;

export type Add = {
  id_adicional: string;
  nome: string;
  preco: number;
};

export type Flavor = {
  id_sabor: string;
  nome: string;
};

export type MenuProduct = { adds: Add[]; flavors: Flavor[] } & Product;
