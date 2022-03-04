import { getSession } from "next-auth/client";
import { ServerError } from "@errors/index";
import { ReqMethod } from "@my-types/backend/req-method";
import { SessionValidator } from "database/helpers/session";
import { FindAllOrderRelationsByUserId } from "@controllers/order";

import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { userId } = req.query;
    const sessionValidator = new SessionValidator(session);

    switch (req.method) {
      case ReqMethod.GET: {
        const numberUserId = Number(userId);
        sessionValidator.validate({ userId: numberUserId });
        const findAllOrderRelations = new FindAllOrderRelationsByUserId(numberUserId, 10);
        const orderRelationsData = await findAllOrderRelations.exec();

        return res.status(200).json(orderRelationsData);
      }

      default: {
        res.setHeader("Allow", [ReqMethod.GET]);
        return res.status(405).json({ message: "Requsição inválida." });
      }
    }
  } catch (e) {
    const error = e as ServerError;
    return res.status(error.httpStatus).json({ message: error.errorMessage });
  }
};

export default handler;
