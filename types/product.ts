import { Produto } from "./database/models/produto";

export type Product = Omit<Produto, "preco_padrao" | "descricao" | "tamanho">;