import * as Yup from "yup";

import { throwError } from "@errors/index";

import type { UpdateAddressArg } from "../index";

export class UpdateAddressValidator {
  private updateAddressArg: UpdateAddressArg;

  constructor(updateAddressArg: UpdateAddressArg) {
    this.updateAddressArg = updateAddressArg;
  }

  public validate() {
    const validationSchema = this.getValidationSchema();
    try {
      validationSchema.validateSync(this.updateAddressArg);
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.log(errors);
      throwError("O-CT-CID", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<UpdateAddressArg> = Yup.object().shape({
      bairro: Yup.string().notRequired(),
      complemento: Yup.string().nullable().notRequired(),
      id_endereco: Yup.number().required("id_endereço é obrigatório"),
      logradouro: Yup.string().notRequired(),
      numero: Yup.string().notRequired(),
    });

    return validationSchema;
  }
}
