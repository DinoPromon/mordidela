import type ICategoria from "@models/categoria";

export type UpdateCategoryArg = Partial<Omit<ICategoria, "id_categoria">> &
  Pick<ICategoria, "id_categoria">;
