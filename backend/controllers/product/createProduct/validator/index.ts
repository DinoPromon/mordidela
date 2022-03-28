import * as Yup from "yup";
import { throwError } from "@errors/index";

import type { ProductCreate } from "@models/produto";

export class CreateProductValidator {
  private createArg: ProductCreate;

  constructor(createProductArg: ProductCreate) {
    this.createArg = createProductArg;
  }

  public validate() {
    try {
      const validationSchema = this.getValidationSchema();

      console.log(this.createArg);

      validationSchema.validateSync(this.createArg);
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.log(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema = Yup.object().shape({
      id_desconto: Yup.number().nullable().typeError("desconto inválido"),
      nome: Yup.string().required("nome inváido"),
      tamanho: Yup.string().nullable().required(),
      descricao: Yup.string().nullable().required(),
      disponivel: Yup.boolean().required(),
      id_categoria: Yup.number().required(),
      preco_padrao: Yup.number().required(),
      qtde_max_sabor: Yup.number().nullable().required(),
      adicionais: Yup.array().of(Yup.number().required()).required().nullable(),
      sabores: Yup.array().of(Yup.number().required()).required().nullable(),
    });

    return validationSchema;
  }
}
