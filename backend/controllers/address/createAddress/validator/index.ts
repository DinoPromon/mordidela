import * as Yup from "yup";
import { throwError } from "@errors/index";
import { CreateAddressData } from "../index";

export class CreateAddressValidator {
  private addressData: CreateAddressData;

  constructor(addressData: CreateAddressData) {
    this.addressData = addressData;
  }

  public validate() {
    const validationSchema = this.getValidationSchema();
    try {
      validationSchema.validateSync(this.addressData);
    } catch (error) {
      const { errors } = error as Yup.ValidationError;
      console.log(errors);
      return throwError("A-C-DI", { customMessage: errors.join(", ") });
    }
  }

  private getValidationSchema() {
    const validationSchema = Yup.object().shape({
      logradouro: Yup.string().required(),
      bairro: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().notRequired().nullable(),
    });

    return validationSchema;
  }
}
