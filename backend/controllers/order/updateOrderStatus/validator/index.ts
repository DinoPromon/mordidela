import * as Yup from "yup";

import { throwError } from "@errors/index";
import { StatusPedido } from "@models/pedido";

import type { UpdateOrderStatusArg } from "../types";

export class UpdateOrderStatusValidator {
  private updateArg: UpdateOrderStatusArg;

  constructor(updateArg: UpdateOrderStatusArg) {
    this.updateArg = updateArg;
  }

  public validate() {
    const validationSchema = this.getVaidationSchema();

    try {
      validationSchema.validateSync(this.updateArg, { abortEarly: false });
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.error(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getPossibleOrderStatus() {
    const possibleValues: StatusPedido[] = [
      StatusPedido.CONFIRMADO,
      StatusPedido.PENDENTE,
      StatusPedido.REJEITADO,
    ];

    return possibleValues;
  }

  private validateOrderStatus(value: string | undefined) {
    if (!value) return false;

    const possibleValues = this.getPossibleOrderStatus();
    const isValid = possibleValues.indexOf(value as StatusPedido) > -1;

    return isValid;
  }

  private getVaidationSchema() {
    const validationSchema: Yup.SchemaOf<UpdateOrderStatusArg> = Yup.object().shape({
      status_pedido: Yup.string()
        .required()
        .test("validateStatus", "Status de pedido inválido", (value) => {
          return this.validateOrderStatus(value);
        }),
      id_pedido: Yup.number()
        .typeError("Tipo ${type} inválido.")
        .required("É necessário especificar o pedido"),
    });

    return validationSchema;
  }
}
