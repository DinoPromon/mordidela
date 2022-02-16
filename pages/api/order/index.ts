import { Prisma } from "database";
import { getSession } from "next-auth/client";
import { CreateOrder } from "@controllers/pedido";
import { ServerError } from "@errors/index";
import { ReqMethod } from "@my-types/backend/req-method";

import type { NextApiHandler } from "next";
import type { CartPedido } from "@models/pedido";
import type { CartProduto } from "@models/produto";

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "É necessário autenticação para este endpoint." });
    }

    switch (req.method) {
      case ReqMethod.POST: {
        const { produtos, pedido } = req.body as { produtos: CartProduto[]; pedido: CartPedido };
        if (pedido.id_usuario !== session.user.id_usuario) {
          return res.status(403).json({ message: "Não pode inserir pedidos para outro usuário." });
        }

        const createOrder = new CreateOrder(session.user.id_usuario, pedido, produtos);
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
