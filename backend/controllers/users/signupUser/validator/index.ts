import * as Yup from "yup";
import validator from "validator";

import { Prisma } from "@backend";
import { throwError } from "@errors/index";

import type { SignupUserData } from "../index";

export class SignupUserValidator {
  private signupUserData: SignupUserData;

  constructor(signupUserData: SignupUserData) {
    this.signupUserData = signupUserData;
  }

  public async validate() {
    const validationSchema = this.getValidationSchema();
    await validationSchema
      .validate(this.signupUserData, { abortEarly: false })
      .catch((error: Yup.ValidationError) => {
        console.log(error);
        return throwError("O-C-DI", { customMessage: error.errors.join(", ") });
      });

    await this.verifyPhoneNumber(this.signupUserData.ddd, this.signupUserData.numero).catch(
      (error: Yup.ValidationError) => {
        console.log("Telefone existente");
        return throwError("O-C-DI", { customMessage: error.errors.join(", ") });
      }
    );

    await this.verifyEmail(this.signupUserData.email).catch((error: Yup.ValidationError) => {
      console.log("Email existente");
      return throwError("O-C-DI", { customMessage: error.errors.join(", ") });
    });
  }

  private async verifyEmail(email: string) {
    const user = await Prisma.usuario.findFirst({
      where: {
        email,
      },
    });

    return user ? false : true;
  }

  private async verifyPhoneNumber(ddd: string, number: string) {
    const phone = await Prisma.telefone.findFirst({
      where: {
        ddd,
        numero: number,
      },
    });

    return phone ? false : true;
  }

  private getValidationSchema() {
    const validationSchema: Yup.SchemaOf<SignupUserData> = Yup.object().shape({
      complemento: Yup.string().nullable().required(),
      bairro: Yup.string().required(),
      email: Yup.string().email().required(),
      logradouro: Yup.string().required(),
      nome: Yup.string().required(),
      senha: Yup.string().required(),
      numero: Yup.string().required(),
      ddd: Yup.string()
        .required()
        .test("isDigit", "DDD inválido", (value) => {
          const pattern = /\d{2}/;
          return pattern.test(value || "");
        }),
      numero_telefone: Yup.string()
        .required()
        .test("isDigit", "Número inválido", (value) => {
          const pattern = /\d{2}/;
          return pattern.test(value || "");
        }),
      data_nascimento: Yup.date().required(),
    });

    return validationSchema;
  }
}
