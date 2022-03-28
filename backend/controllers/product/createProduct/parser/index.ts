import type { ProductCreate } from "@models/produto";
import type { CreateProductArg } from "../types";

enum Disponivel {
  TRUE = "1",
  FALSE = "0",
}

export class CreateProductParser {
  private createProductArgs: CreateProductArg;

  constructor(createProductArgs: CreateProductArg) {
    this.createProductArgs = createProductArgs;
  }

  private getParsedDisponivel() {
    if (this.createProductArgs.disponivel === Disponivel.TRUE) return true;
    return false;
  }

  private parseAdicionais() {
    if (!this.createProductArgs.adicionais) return null;

    if (Array.isArray(this.createProductArgs.adicionais)) return null;

    return JSON.parse(this.createProductArgs.adicionais);
  }

  private parseSabores() {
    if (!this.createProductArgs.sabores) return null;

    if (Array.isArray(this.createProductArgs.sabores)) return null;

    return JSON.parse(this.createProductArgs.sabores);
  }

  private parseIdDesconto() {
    if (!this.createProductArgs.id_desconto) return null;

    if (Array.isArray(this.createProductArgs.id_desconto)) return null;

    const numberIdDesconto = Number(this.createProductArgs.id_desconto);

    if (isNaN(numberIdDesconto)) return null;

    return numberIdDesconto;
  }

  public parse() {
    console.log(this.parseIdDesconto());

    const parsedProductCreate: ProductCreate = {
      nome: String(this.createProductArgs.nome),
      qtde_max_sabor: this.createProductArgs.qtde_max_sabor
        ? Number(this.createProductArgs.qtde_max_sabor)
        : null,
      descricao: this.createProductArgs.descricao ? String(this.createProductArgs.descricao) : null,
      disponivel: this.getParsedDisponivel(),
      preco_padrao: Number(this.createProductArgs.preco_padrao),
      tamanho: this.createProductArgs.tamanho ? String(this.createProductArgs.tamanho) : null,
      id_desconto: this.parseIdDesconto(),
      id_categoria: Number(this.createProductArgs.id_categoria),
      adicionais: this.parseAdicionais(),
      sabores: this.parseSabores(),
    };

    return parsedProductCreate;
  }
}
