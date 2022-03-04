import * as Yup from "yup";
import validator from "validator";

import { Prisma } from "@database";
import { throwError } from "@errors/index";
import { SignupUserParser } from "../parser";

import type { SignupUserData } from "../index";

export class SignupUserValidator {
  private signupUserData: SignupUserData;
  private parser: SignupUserParser;

  constructor(signupUserData: SignupUserData) {
    this.signupUserData = signupUserData;
    this.parser = new SignupUserParser(signupUserData);
  }

  public async exec() {
    const validationSchema = this.getValidationSchema();
    await validationSchema
      .validate(this.signupUserData, { abortEarly: false })
      .catch((error: Yup.ValidationError) =>
        throwError("O-C-DI", { customMessage: error.errors.join(", ") })
      );

    const parsedData = this.parser.exec();
    await this.verifyPhoneNumber(parsedData.ddd, parsedData.numero).catch(
      (error: Yup.ValidationError) =>
        throwError("O-C-DI", { customMessage: error.errors.join(", ") })
    );

    await this.verifyEmail(parsedData.email).catch((error: Yup.ValidationError) =>
      throwError("O-C-DI", { customMessage: error.errors.join(", ") })
    );

    return parsedData;
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
      data_nascimento: Yup.string()
        .required()
        .test("isValid", "", (value) =>
          validator.isDate(value || "", { format: "DD/MM/YYYY", strictMode: true })
        ),
    });

    return validationSchema;
  }
}
