import { Adicional } from "./adicional";
import { Categoria } from "./categoria";

export type CategoriaAdicional = Pick<Categoria, "id_categoria"> & Pick<Adicional, "id_adicional">;
