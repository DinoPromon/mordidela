import { throwError } from "@errors/index";
import { Autorizacao } from "@models/usuario";

import type { Session } from "next-auth";
import type IUsuario from "@models/usuario";

type PermissionsData = {
  userId: IUsuario["id_usuario"];
  necessaryAuthorization?: Autorizacao;
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

  private validateAdminAuthorization(necessaryAuthorization: Autorizacao) {
    const userAuth = this.session?.user.autorizacao;

    if (necessaryAuthorization !== userAuth) return throwError("S-NP");
  }

  public validate(permissionsData?: Partial<PermissionsData>) {
    this.validateSession();
    if (permissionsData) {
      const { necessaryAuthorization, userId } = permissionsData;
      if (userId) {
        this.validateUser(userId);
      }

      if (necessaryAuthorization) {
        this.validateAdminAuthorization(necessaryAuthorization);
      }
    }
  }
}
