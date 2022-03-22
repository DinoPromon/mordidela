import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { PasswordHasher } from "@helpers/password";
import { LoginUserValidator } from "./validator";

import type { LoginUserArg } from "./types";

export class LoginUser {
  private loginArg: LoginUserArg;
  private validator: LoginUserValidator;
  private passwordHasher = new PasswordHasher();

  constructor(loginArg: LoginUserArg) {
    this.loginArg = loginArg;
    this.validator = new LoginUserValidator(this.loginArg);
  }

  public async exec() {
    this.validator.validate();

    const user = await this.findUser();

    return user;
  }

  public async findUser() {
    const hashedPassword = await this.passwordHasher.hash(this.loginArg.senha);

    const user = await Prisma.usuario
      .findFirst({
        where: {
          email: this.loginArg.email,
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo inesperado aconteceu" });
      });

    if (!user) throwError("O-C-DI", { customMessage: "Dado(s) inválido(s)" });

    const isPasswordEquals = this.passwordHasher.compare(hashedPassword, user.senha);

    console.log(user.senha, hashedPassword);

    if (!isPasswordEquals) throwError("O-C-DI", { customMessage: "Dado(s) inválido(s)" });

    return user;
  }
}
