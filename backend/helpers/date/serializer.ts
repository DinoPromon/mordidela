import { createDate } from "@utils/transformation/date";

import type ICupom from "@models/cupom";
import IUsuarioCupom from "@models/usuario_cupom";

export class DateSerializer {
  public static serialize(date: Date | number | string | null) {
    if (date) {
      const newDate = createDate(date);
      return newDate.getTime();
    }
    return null;
  }

  public static serializeCoupon(coupon: ICupom) {
    const serializedCoupon: ICupom = {
      ...coupon,
      data_fim: DateSerializer.serialize(coupon.data_fim),
      data_inicio: DateSerializer.serialize(coupon.data_inicio),
      data_criacao: DateSerializer.serialize(coupon.data_criacao) as number,
    };

    return serializedCoupon;
  }

  public static serializeUserCoupon(userCoupon: IUsuarioCupom) {
    const serializedUserCoupon: IUsuarioCupom = {
      ...userCoupon,
      data_uso: DateSerializer.serialize(userCoupon.data_uso),
      data_obtencao: DateSerializer.serialize(userCoupon.data_obtencao),
    };

    return serializedUserCoupon;
  }
}
