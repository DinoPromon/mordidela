import { getSession } from "next-auth/client";

import { ReqMethod } from "@my-types/backend/reqMethod";
import { SessionValidator } from "@helpers/session";
import { UpdateGeneralData } from "@controllers/users";
// import { updateGeneralData } from "@controllers/generalData";

import type { NextApiHandler } from "next";
import type { ServerError } from "@errors/index";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { userId } = req.query;
    const sessionValidator = new SessionValidator(session);

    switch (req.method) {
      case ReqMethod.PUT: {
        const numberUserId = Number(userId);
        sessionValidator.validate({ userId: numberUserId });

        const updateGeneralData = new UpdateGeneralData(numberUserId, req.body);
        await updateGeneralData.exec();

        return res.status(200).json(updateGeneralData);
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
