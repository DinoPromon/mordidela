import { Desconto } from "./desconto";

export type Categoria = {
  id_categoria: string;
  nome: string;
} & Partial<Pick<Desconto, "id_desconto">>;
