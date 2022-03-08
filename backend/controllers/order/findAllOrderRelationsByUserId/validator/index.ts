import * as Yup from "yup";
import { throwError } from "@errors/index";

import type IPedido from "@models/pedido";
import type IUsuario from "@models/usuario";

type ValidationSchema = {
  userId: IUsuario["id_usuario"];
  itemsAmount?: number;
  lastOrderId?: IPedido["id_usuario"];
};

export class FindAllOrdersRelationsByUserIdValidator {
  private userId: IUsuario["id_usuario"];
  private itemsAmount?: number;
  private lastOrderid?: IPedido["id_pedido"];

  constructor(
    userId: IUsuario["id_usuario"],
    itemsAmount?: number,
    lastOrderid?: IPedido["id_pedido"]
  ) {
    this.userId = userId;
    this.itemsAmount = itemsAmount;
    this.lastOrderid = lastOrderid;
  }

  public validate() {
    try {
      const validationData = this.getValidationData();
      const validationSchema = this.getValidationSchema();

      validationSchema.validateSync(validationData, { abortEarly: false });
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.log(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationData() {
    const validationData: ValidationSchema = {
      userId: this.userId,
      itemsAmount: this.itemsAmount,
      lastOrderId: this.lastOrderid,
    };

    return validationData;
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<ValidationSchema> = Yup.object().shape({
      userId: Yup.number().required(),
      itemsAmount: Yup.number().notRequired(),
      lastOrderId: Yup.number().notRequired(),
    });

    return validationSchema;
  }
}
