import { Prisma } from "@backend";

import { throwError } from "@errors/index";
import { InputParser } from "@helpers/input";

import { SignupUserValidator } from "./validator";

import type IUsuario from "@models/usuario";

export type SignupUserData = {
  complemento: string | null;
  ddd: string;
  bairro: string;
  email: string;
  logradouro: string;
  nome: string;
  numero: string;
  senha: string;
  data_nascimento: string | Date;
  numero_telefone: string;
};

export class SignupUser extends InputParser {
  private signupUserdata: SignupUserData;
  private validator: SignupUserValidator;

  constructor(signupUserData: SignupUserData) {
    super();
    this.signupUserdata = this.serialize(signupUserData);
    this.validator = new SignupUserValidator(this.serialize(signupUserData));
  }

  public async exec() {
    await this.validator.validate();
    console.log(this.signupUserdata);
    const createdUser = await this.createUser(this.signupUserdata);
    await this.createAddress(this.signupUserdata, createdUser.id_usuario);
    await this.createPhone(this.signupUserdata, createdUser.id_usuario);

    return createdUser;
  }

  private async createPhone(data: SignupUserData, userId: number) {
    await Prisma.telefone
      .create({
        data: {
          ddd: data.ddd,
          numero: data.numero_telefone,
          id_usuario: userId,
        },
      })
      .catch((error) => {
        console.log(error);
        throwError("O-C-DI");
      });
  }

  private async createAddress(data: SignupUserData, userId: number) {
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
      .catch((error) => {
        console.log(error);
        throwError("O-C-DI");
      });
  }

  private async createUser(data: SignupUserData) {
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
      .catch((error) => {
        console.log(error);
        throwError("O-C-DI");
      });

    return createdUser as IUsuario;
  }
}
