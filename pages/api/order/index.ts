import { Prisma } from "database";
import { throwError } from "@errors/index";
import { getSession } from "next-auth/client";
import { CreateOrder } from "@controllers/pedido";
import { ServerError } from "@errors/index";
import { ReqMethod } from "@my-types/backend/req-method";
import { SessionValidator } from "database/helpers/session";

import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const sessionValidator = new SessionValidator(session);

    switch (req.method) {
      case ReqMethod.POST: {
        sessionValidator.validate({ userId: session?.user.id_usuario });
        const userId = session?.user.id_usuario as number;

        const createOrder = new CreateOrder(userId, req.body);
        const createdOrder = await createOrder.exec();

        return res.status(200).json(createdOrder);
      }

      case ReqMethod.GET: {
        const orders = await Prisma.pedido.findMany();

        return res.status(200).json(orders);
      }

      default: {
        res.setHeader("Allow", [ReqMethod.GET, ReqMethod.POST]);
        return res.status(405).json({ message: "Requsição inválida." });
      }
    }
  } catch (e) {
    const error = e as ServerError;
    return res.status(error.httpStatus).json({ message: error.errorMessage });
  }
};

export default handler;
