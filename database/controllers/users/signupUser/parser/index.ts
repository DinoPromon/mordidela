import { createDate } from "@utils/transformation/date";

import type { SignupUserData } from "../index";

export type SignupUserDataParsed = {
  complemento: string | null;
  ddd: string;
  bairro: string;
  email: string;
  logradouro: string;
  nome: string;
  numero_telefone: string;
  numero: string;
  senha: string;
  data_nascimento: Date;
};

export class SignupUserParser {
  private signupUserData: SignupUserData;

  constructor(signupUserData: SignupUserData) {
    this.signupUserData = signupUserData;
  }

  public exec() {
    const parsedData: SignupUserDataParsed = {
      bairro: this.signupUserData.bairro.trim(),
      ddd: this.signupUserData.ddd.trim(),
      complemento: this.signupUserData.complemento ? this.signupUserData.complemento.trim() : null,
      data_nascimento: createDate(this.signupUserData.data_nascimento),
      email: this.signupUserData.email.trim(),
      logradouro: this.signupUserData.logradouro.trim(),
      nome: this.signupUserData.nome.trim(),
      numero: this.signupUserData.numero.trim(),
      numero_telefone: this.signupUserData.numero_telefone.trim(),
      senha: this.signupUserData.senha,
    };

    return parsedData;
  }
}
