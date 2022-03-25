import { getSession } from "next-auth/client";

import { throwError } from "@errors/index";
import { Autorizacao } from "@models/usuario";
import { CreateCategory } from "@controllers/category";
import { SessionValidator } from "@helpers/session";
import { ReqMethod } from "@my-types/backend/reqMethod";

import type { NextApiHandler } from "next";
import type { ServerError } from "@errors/index";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req }).catch((err) => {
      console.error(err);
      throwError("S-NP", { customMessage: "Algo de errado aconteceu na validação de autorização" });
    });
    const sessionValidator = new SessionValidator(session);
    sessionValidator.validate({
      necessaryAuthorization: Autorizacao.ADMIN,
    });

    switch (req.method) {
      case ReqMethod.POST: {
        const createCategory = new CreateCategory(req.body);
        const createdCategory = await createCategory.exec();

        return res.status(200).json(createdCategory);
      }

      default: {
        res.setHeader("Allow", [ReqMethod.POST]);
        return res.status(405).json({ message: "Requsição inválida." });
      }
    }
  } catch (e) {
    const error = e as ServerError;
    return res.status(error.httpStatus).json({ message: error.errorMessage });
  }
};

export default handler;
