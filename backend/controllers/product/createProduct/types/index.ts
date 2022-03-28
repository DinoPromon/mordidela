import type { ProductCreate } from "@models/produto";

export type NonNullableProductCreateProps = Omit<
  ProductCreate,
  "qtde_max_sabor" | "descricao" | "id_desconto" | "sabores" | "adicionais"
>;

export type NullableProductCreateProps = Pick<
  ProductCreate,
  "qtde_max_sabor" | "descricao" | "id_desconto" | "sabores" | "adicionais"
>;

export type CreateProductArg = {
  [key in keyof NonNullableProductCreateProps]: string | string[];
} & {
  [key in keyof NullableProductCreateProps]?: string | string[];
};
