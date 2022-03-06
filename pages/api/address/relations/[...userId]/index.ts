import { getSession } from "next-auth/client";
import { ReqMethod } from "@my-types/backend/reqMethod";
import { SessionValidator } from "@helpers/session";
import { findManyAddressByUserId } from "@controllers/address";

import type { NextApiHandler } from "next";
import type { ServerError } from "@errors/index";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { userId } = req.query;
    const sessionValidator = new SessionValidator(session);

    sessionValidator.validate({ userId: Number(userId) });

    switch (req.method) {
      case ReqMethod.GET: {
        const addresses = await findManyAddressByUserId(Number(userId));
        return res.status(200).json(addresses);
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
