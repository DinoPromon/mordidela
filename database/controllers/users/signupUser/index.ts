import { Prisma } from "@database";
import { throwError } from "@errors/index";
import { SignupUserParser } from "./parser";
import { SignupUserValidator } from "./validator";

import type IUsuario from "@models/usuario";
import type { SignupUserDataParsed } from "./parser";

export type SignupUserData = {
  complemento: string | null;
  ddd: string;
  bairro: string;
  email: string;
  logradouro: string;
  nome: string;
  numero: string;
  senha: string;
  data_nascimento: string;
  numero_telefone: string;
};

export class SignupUser {
  private validator: SignupUserValidator;
  private parser: SignupUserParser;

  constructor(signupUserData: SignupUserData) {
    this.parser = new SignupUserParser(signupUserData);
    this.validator = new SignupUserValidator(signupUserData);
  }

  public async exec() {
    await this.validator.exec();
    const parsedData = this.parser.exec();
    const createdUser = await this.createUser(parsedData);
    await this.createAddress(parsedData, createdUser.id_usuario);
    await this.createPhone(parsedData, createdUser.id_usuario);

    return createdUser;
  }

  private async createPhone(data: SignupUserDataParsed, userId: number) {
    await Prisma.telefone
      .create({
        data: {
          ddd: data.ddd,
          numero: data.numero_telefone,
          id_usuario: userId,
        },
      })
      .catch((error) => throwError("O-C-DI"));
  }

  private async createAddress(data: SignupUserDataParsed, userId: number) {
    await Prisma.endereco
      .create({
        data: {
          bairro: data.bairro,
          logradouro: data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
          id_usuario: userId,
        },
      })
      .catch((error) => throwError("O-C-DI"));
  }

  private async createUser(data: SignupUserDataParsed) {
    const createdUser = await Prisma.usuario
      .create({
        data: {
          data_nascimento: data.data_nascimento,
          email: data.email,
          nome: data.nome,
          senha: data.senha,
          autorizacao: "cliente",
          data_criacao: new Date(),
        },
      })
      .catch((error) => throwError("O-C-DI"));

    return createdUser as IUsuario;
  }
}
