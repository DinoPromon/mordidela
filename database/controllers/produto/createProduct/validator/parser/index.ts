import type { ProductCreate } from "@models/produto";

type NonNullableProductCreateProps = Omit<
  ProductCreate,
  "qtde_max_sabor" | "descricao" | "id_desconto"
>;
type NullableProductCreateProps = Pick<
  ProductCreate,
  "qtde_max_sabor" | "descricao" | "id_desconto"
>;

export type CreateProductArg = {
  [key in keyof NonNullableProductCreateProps]: string | string[];
} & {
  [key in keyof NullableProductCreateProps]?: string | string[];
};

export class CreateProductParser {
  private createProductArgs: CreateProductArg;

  constructor(createProductArgs: CreateProductArg) {
    this.createProductArgs = createProductArgs;
  }

  private getParsedDisponivel() {
    if (this.createProductArgs.disponivel === "true") return true;
    return false;
  }

  public getParsedProductCreate() {
    const parsedProductCreate: ProductCreate = {
      nome: String(this.createProductArgs.nome),
      qtde_max_sabor: this.createProductArgs.qtde_max_sabor
        ? Number(this.createProductArgs.qtde_max_sabor)
        : null,
      descricao: this.createProductArgs.descricao ? String(this.createProductArgs.descricao) : null,
      disponivel: this.getParsedDisponivel(),
      preco_padrao: Number(this.createProductArgs.preco_padrao),
      tamanho: this.createProductArgs.tamanho ? String(this.createProductArgs.tamanho) : null,
      id_desconto: this.createProductArgs.id_desconto
        ? Number(this.createProductArgs.id_desconto)
        : null,
      id_categoria: Number(this.createProductArgs.id_categoria),
    };

    return parsedProductCreate;
  }
}
