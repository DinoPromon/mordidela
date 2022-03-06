import { throwError } from "@errors/index";

import type { Session } from "next-auth";
import type { Autorizacao } from "@models/usuario";
import type IUsuario from "@models/usuario";

type PermissionsData = {
  userId: IUsuario["id_usuario"];
  authorization: Autorizacao;
};

export class SessionValidator {
  private session: Session | null;

  constructor(session: Session | null) {
    this.session = session;
  }

  private validateSession() {
    if (!this.session || !this.session.user) {
      return throwError("S-NL");
    }
  }

  private validateUser(userId: IUsuario["id_usuario"]) {
    if (this.session?.user.id_usuario !== userId) {
      return throwError("S-UNA");
    }
  }

  private validateAuthorization(authorization: Autorizacao) {
    return throwError("S-NP");
  }

  public validate(permissionsData?: Partial<PermissionsData>) {
    this.validateSession();
    if (permissionsData) {
      const { authorization, userId } = permissionsData;
      if (userId) {
        this.validateUser(userId);
      }
      if (authorization) {
        this.validateAuthorization;
      }
    }
  }
}
