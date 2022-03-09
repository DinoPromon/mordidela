import { getSession } from "next-auth/client";

import { UpdateAddress } from "@controllers/address";
import { SessionValidator } from "@helpers/session";
import { ReqMethod } from "@my-types/backend/reqMethod";

import type { NextApiHandler } from "next";

import type { ServerError } from "@errors/index";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    const { addressId } = req.query;
    const sessionValidator = new SessionValidator(session);

    switch (req.method) {
      case ReqMethod.PUT: {
        sessionValidator.validate();
        const numberAddressId = Number(addressId);

        const updateaddress = new UpdateAddress(session?.user.id_usuario as number, {
          ...req.body,
          id_endereco: numberAddressId,
        });
        const updatedAddress = await updateaddress.exec();

        return res.status(200).json(updatedAddress);
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
