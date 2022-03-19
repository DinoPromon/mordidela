import { getSession } from "next-auth/client";

import { ServerError, throwError } from "@errors/index";
import { Autorizacao } from "@models/usuario";
import { SessionValidator } from "@helpers/session";
import { ReqMethod } from "@my-types/backend/reqMethod";
import { UpdateOrderStatus } from "@controllers/order";

import type { NextApiHandler } from "next";

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
      case ReqMethod.PUT: {
        const { orderId } = req.query;
        const updateOrderStatus = new UpdateOrderStatus({
          id_pedido: Number(orderId),
          ...req.body,
        });

        const updatedOrder = await updateOrderStatus.exec();

        return res.status(200).json(updatedOrder);
      }

      default: {
        res.setHeader("Allow", [ReqMethod.PUT]);
        return res.status(405).json({ message: "Requsição inválida." });
      }
    }
  } catch (e) {
    const error = e as ServerError;
    return res.status(error.httpStatus).json({ message: error.errorMessage });
  }
};

export default handler;
