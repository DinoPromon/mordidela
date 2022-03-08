import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { SessionValidator } from "@helpers/session";
import { ReqMethod } from "@my-types/backend/reqMethod";
import { FindUserGeneralData } from "@controllers/users";

import type { ServerError } from "@errors/index";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { userId } = req.query;

    const sessionValidator = new SessionValidator(session);

    switch (req.method) {
      case ReqMethod.GET: {
        const numberUserId = Number(userId);
        sessionValidator.validate({ userId: numberUserId });

        const findUserGeneralData = new FindUserGeneralData(Number(userId));
        const userGeneralData = await findUserGeneralData.exec();

        return res.status(200).json(userGeneralData);
      }

      default: {
        res.setHeader("Allow", [ReqMethod.GET]);
        res.status(405).json({ message: "Requisição inválida" });
      }
    }
  } catch (err) {
    const error = err as ServerError;
    return res.status(error.httpStatus).json({ message: error.errorMessage });
  }
};

export default handler;
