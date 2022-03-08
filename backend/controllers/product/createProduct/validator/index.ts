import * as Yup from "yup";
import { throwError } from "@errors/index";
import { CreateProductParser, CreateProductArg } from "./parser";

import type { ProductCreate } from "@models/produto";

export class CreateProductValidator {
  private dataParser: CreateProductParser;

  constructor(createProductArgs: CreateProductArg) {
    this.dataParser = new CreateProductParser(createProductArgs);
  }

  public validate() {
    try {
      const validationSchema = this.getValidationSchema();
      const parsedCreateProductData = this.dataParser.getParsedProductCreate();

      validationSchema.validateSync(parsedCreateProductData);
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.log(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  public getCreateProductData() {
    return this.dataParser.getParsedProductCreate();
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<ProductCreate> = Yup.object().shape({
      id_desconto: Yup.number().nullable().required(),
      nome: Yup.string().required(),
      tamanho: Yup.string().nullable().required(),
      descricao: Yup.string().nullable().required(),
      disponivel: Yup.boolean().required(),
      id_categoria: Yup.number().required(),
      preco_padrao: Yup.number().required(),
      qtde_max_sabor: Yup.number().nullable().required(),
    });

    return validationSchema;
  }
}
