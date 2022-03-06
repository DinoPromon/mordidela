import * as Yup from "yup";

import { throwError } from "@errors/index";
import type { GeneralData } from "../index";

export class UpdateGeneralDataValidator {
  private generalData: Partial<GeneralData>;

  constructor(generalData: Partial<GeneralData>) {
    this.generalData = generalData;
  }

  public validate() {
    const validationSchema = this.getValidationSchema();
    try {
      validationSchema.validateSync(this.generalData);
    } catch (err) {
      const { errors } = err as Yup.ValidationError;
      console.log(errors);
      throwError("O-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<Partial<GeneralData>> = Yup.object().shape({
      data_nascimento: Yup.date().notRequired(),
      ddd: Yup.string().notRequired(),
      nome: Yup.string().notRequired(),
      numero: Yup.string().notRequired(),
    });

    return validationSchema;
  }
}
