import IUsuarioCupom from "@models/usuario_cupom";
import { Prisma } from "@database";
import { RelatedUserCupomReq } from "@models/cupom";
import { usuario_cupom, pedido, cupom } from "@prisma/client";

type UsuarioCupomRelacionado = usuario_cupom & {
  cupom: cupom;
  pedido: pedido | null;
};

export async function findCupomRelationsById(userId: IUsuarioCupom["id_cupom"]) {
  const relatedCoupons: UsuarioCupomRelacionado[] = await Prisma.usuario_cupom.findMany({
    where: {
      id_usuario: userId,
    },
    include: {
      cupom: true,
      pedido: true,
    },
  });

  return relatedCoupons.map(
    (relatedCupom) =>
      ({
        ...relatedCupom,
        pedido: relatedCupom.pedido
          ? {
              ...relatedCupom.pedido,
              data_confirmacao: relatedCupom.pedido.data_confirmacao?.getTime(),
              data_pedido: relatedCupom.pedido.data_pedido.getTime(),
            }
          : null,
      } as RelatedUserCupomReq)
  );
}
