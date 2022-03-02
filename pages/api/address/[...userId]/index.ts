import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { ReqMethod } from "@my-types/backend/req-method";
import { SessionValidator } from "database/helpers/session";
import { FindAllAddressesByUserId } from "@controllers/endereco";

import type { ServerError } from "@errors/index";
import { CreateAddress } from "@controllers/endereco/createAddress";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { userId } = req.query;
    const sessionValidator = new SessionValidator(session);

    sessionValidator.validate({ userId: Number(userId) });

    switch (req.method) {
      case ReqMethod.GET: {
        const findAllAddresses = new FindAllAddressesByUserId(Number(userId));
        const addresses = await findAllAddresses.exec();
        return res.status(200).json(addresses);
      }

      case ReqMethod.POST: {
        const createAddress = new CreateAddress({ ...req.body, userId: Number(userId) });
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
