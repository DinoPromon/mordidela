import * as yup from "yup";
import { transformPriceStringToNumber } from "@utils/transformation";

export const useCartFormValidationSchema = (subTotalPrice: number) => {

  const cartFormValidationSchema = yup.object().shape({
    deliveryType: yup.string().nullable().required("Selecione um tipo de entrega"),
    paymentType: yup.string().nullable().required("Selecione um tipo de pagamento"),
    addressId: yup
      .number()
      .nullable()
      .when("delivery_type", (value) => {
        if (value === "balcao") return yup.number().nullable();
        return yup.number().nullable().required("Selecione um endereço de entrega");
      }),
    needChange: yup
      .boolean()
      .nullable()
      .when("paymentType", (value) => {
        if (value === "dinheiro")
          return yup.string().nullable().required("Informe a necessidade de troco");
        return yup.string().nullable();
      }),
    paymentAmount: yup.string().when(["needChange", "paymentType", "deliveryPrice"], {
      is: (needChange: string, paymentType: string) => {
        if (paymentType === "dinheiro" && needChange === "true") return true;
        return false;
      },
      then: yup.string().test("paymentAmount", "Valor insuficiente", (value, context) => {
        const paymentAmount = value || "";
        const coupon = context.parent.coupon;
        if (coupon) {
          const paymentAmountAsNumber = transformPriceStringToNumber(paymentAmount);
          if (
            paymentAmountAsNumber <
            context.parent.deliveryPrice + ((100 - coupon.valor_desconto) * subTotalPrice) / 100
          ) {
            return false;
          }
          return true;
        }
        const paymentAmountAsNumber = transformPriceStringToNumber(paymentAmount);
        if (paymentAmountAsNumber < context.parent.deliveryPrice + subTotalPrice) return false;
        return true;
      }),
    }),
    coupon: yup
      .object()
      .shape({
        id_cupom: yup.number(),
        valor_desconto: yup.number(),
        codigo_cupom: yup.string(),
        tipo_cupom: yup.string(),
      })
      .nullable(),
  });

  return cartFormValidationSchema;
};
