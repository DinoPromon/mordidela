import * as yup from "yup";
import { transformPriceStringToNumber } from "@utils/transformation";

export const useCartFormValidationSchema = (subTotalPrice: number) => {

  const cartFormValidationSchema = yup.object().shape({
    delivery_type: yup.string().nullable().required("Selecione um tipo de entrega"),
    payment_type: yup.string().nullable().required("Selecione um tipo de pagamento"),
    address_id: yup
      .number()
      .nullable()
      .when("delivery_type", (value) => {
        if (value === "balcao") return yup.number().nullable();
        return yup.number().nullable().required("Selecione um endereço de entrega");
      }),
    needChange: yup
      .boolean()
      .nullable()
      .when("payment_type", (value) => {
        if (value === "dinheiro")
          return yup.string().nullable().required("Informe a necessidade de troco");
        return yup.string().nullable();
      }),
    payment_amount: yup.string().when(["needChange", "payment_type", "delivery_price"], {
      is: (needChange: string, paymentType: string) => {
        if (paymentType === "dinheiro" && needChange === "true") return true;
        return false;
      },
      then: yup.string().test("payment_amount", "Valor insuficiente", (value, context) => {
        const payment_amount = value || "";
        const cupom = context.parent.cupom;
        if (cupom) {
          const paymentAmountAsNumber = transformPriceStringToNumber(payment_amount);
          if (
            paymentAmountAsNumber <
            context.parent.delivery_price + ((100 - cupom.valor_desconto) * subTotalPrice) / 100
          ) {
            return false;
          }
          return true;
        }
        const paymentAmountAsNumber = transformPriceStringToNumber(payment_amount);
        if (paymentAmountAsNumber < context.parent.delivery_price + subTotalPrice) return false;
        return true;
      }),
    }),
    cupom: yup
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
