import * as yup from "yup";
import { useContext } from "react";
import { transformPriceStringToNumber } from "@utils/transformation";
import { CartContext } from "@store/cart";

export const useCartFormValidationSchema = (subTotalPrice: number) => {
  const { order } = useContext(CartContext);

  const cartFormValidationSchema = yup.object().shape({
    delivery_type: yup.string().nullable().required("Selecione um tipo de entrega"),
    address_id: yup.number().nullable().required("Selecione um endereço de entrega"),
    payment_type: yup.string().nullable().required("Selecione um tipo de pagamento"),
    needChange: yup
      .boolean()
      .nullable()
      .when("payment_type", (value) => {
        if (value === "dinheiro")
          return yup.string().nullable().required("Informe a necessidade de troco");
        return yup.string().nullable();
      }),
    payment_amount: yup.string().when(["needChange", "payment_type"], {
      is: (needChange: string, paymentType: string) => {
        if (paymentType === "dinheiro" && needChange === "true") return true;
        return false;
      },
      then: yup.string().test("payment_amount", "Valor insuficiente", (value) => {
        const payment_amount = value || "";
        const paymentAmountAsNumber = transformPriceStringToNumber(payment_amount);
        if (paymentAmountAsNumber < Number(order.delivery_price) + subTotalPrice) return false;
        return true;
      }),
    }),
    cupom_id: yup.string().nullable(),
  });

  return cartFormValidationSchema;
};