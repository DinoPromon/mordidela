import { getSession } from "next-auth/client";

import { FindDateFilter } from "@controllers/order/findAllOrdersGeneralData/constants";
import { throwError } from "@errors/index";
import { Autorizacao } from "@models/usuario";
import { SessionValidator } from "@helpers/session";
import { ReqMethod } from "@my-types/backend/reqMethod";
import { FindAllOrderGeneralData } from "@controllers/order";

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
      case ReqMethod.GET: {
        const { status_pedido, ...paginationData } = req.query;

        const findAllOrdersGeneralData = new FindAllOrderGeneralData(
          {
            status_pedido: req.query.status_pedido,
            filtro_data_pedido: req.query.filtro_data_pedido,
            data_pedido: req.query.data_pedido,
          },
          paginationData
        );
        const ordersGeneralData = await findAllOrdersGeneralData.exec();

        return res.status(200).json(ordersGeneralData);
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
