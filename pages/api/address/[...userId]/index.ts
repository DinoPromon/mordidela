import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { ReqMethod } from "@my-types/backend/req-method";
import { SessionValidator } from "database/helpers/session";
import { findManyAddressByUserId } from "@controllers/endereco";
import { CreateAddress } from "@controllers/endereco/createAddress";

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

      case ReqMethod.POST: {
        const numberUserId = Number(userId);
        const createAddress = new CreateAddress({ ...req.body, userId: numberUserId });
        const createdAddress = await createAddress.exec();
        return res.status(200).json(createdAddress);
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
