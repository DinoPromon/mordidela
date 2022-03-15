import * as Yup from "yup";
import { TipoEntrega, TipoPagamento } from "@models/pedido";
import { throwError } from "@errors/index";

import type { CartProduto } from "@models/produto";
import type { CartOrderData, CreateOrderData } from "../types";

export class CreateOrderValidator {
  private orderData: CartOrderData;
  private productsData: CartProduto[];

  constructor(createOrderData: CreateOrderData) {
    this.orderData = createOrderData.orderData;
    this.productsData = createOrderData.productsData;
  }

  public validate() {
    try {
      const productsValidationSchema = this.getProductsValiationSchema();
      const orderDataValidationSchema = this.getOrderDataValdiationSchema();

      orderDataValidationSchema.validateSync(this.orderData, { abortEarly: false });
      productsValidationSchema.validateSync(this.productsData, { abortEarly: false });
    } catch (error) {
      const { errors } = error as Yup.ValidationError;
      console.log(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getOrderDataValdiationSchema() {
    const orderDataValidationSchema = Yup.object().shape({
      tipo_entrega: Yup.string().required(),
      id_cupom: Yup.number().nullable(),
      tipo_pagamento: Yup.string().required(),
      id_usuario: Yup.number().required(),
      troco_para: Yup.number()
        .nullable()
        .when("tipo_pagamento", (paymentType, schema: Yup.AnySchema) => {
          if (paymentType === TipoPagamento.DINHEIRO) return schema.required();
          return schema;
        }),
      id_endereco: Yup.number()
        .nullable()
        .when("tipo_entrega", (deliveryType, schema: Yup.AnySchema) => {
          if (deliveryType === TipoEntrega.ENTREGA) return schema.required();
          return schema;
        }),
    });

    return orderDataValidationSchema;
  }

  private getProductsValiationSchema() {
    const productsValidationSchema = Yup.array()
      .min(1)
      .of(
        Yup.object().shape({
          id_produto: Yup.number().required(),
          adicionais: Yup.array().of(Yup.number()),
          sabores: Yup.array().of(Yup.number()),
          observacao: Yup.string().nullable(),
          quantidade: Yup.number().required(),
        })
      );
    return productsValidationSchema;
  }
}
