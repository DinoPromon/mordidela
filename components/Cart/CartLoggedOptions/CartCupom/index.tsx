import React, { useState } from "react";
import Axios from "@api";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useFormikContext } from "formik";
import { FormButton } from "@components/shared";
import { cupomFormat } from "@utils/formatters";
import { RequestState } from "@my-types/request";
import { CartCupomContainer, CartCupomInput } from "./styled";

import type ICupom from "@models/cupom";
import type { AxiosError } from "axios";
import type { CartFormValues } from "@components/Cart/FormModel";

type CartCupomProps = {
  onChangeRequestStatus: (status: Partial<RequestState>) => void;
};

const CartCupom: React.FC<CartCupomProps> = ({ onChangeRequestStatus }) => {
  const { values, setFieldValue } = useFormikContext<CartFormValues>();
  const [isLoadingCupom, setIsLoadingCupom] = useState(false);
  const [inputCupom, setInputCupom] = useState(cupomFormat(values.coupon?.codigo_cupom || ""));

  function couponCodeChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInputCupom(cupomFormat(event.target.value));
  }

  async function fetchCupom() {
    setIsLoadingCupom(true);
    try {
      const response = await Axios.get<ICupom>(`/cupom?codigo=${inputCupom}`);
      if (response.data) {
        setFieldValue("coupon", {
          id_cupom: response.data.id_cupom,
          valor_desconto: response.data.valor_desconto,
          codigo_cupom: response.data.codigo,
          tipo_cupom: response.data.tipo,
        });
      }
    } catch (e) {
      const error = e as AxiosError;
      onChangeRequestStatus({ error: error.response?.data.message, isLoading: false });
    }
    setIsLoadingCupom(false);
  }

  function addCupomClickHandler() {
    fetchCupom();
  }

  return (
    <CartCupomContainer>
      <CartCupomInput
        type="text"
        placeholder="Digite aqui seu cupom"
        onChange={couponCodeChangeHandler}
        value={inputCupom}
      />
      {isLoadingCupom ? (
        <CircularProgress size={40} />
      ) : (
        <FormButton type="button" onClick={addCupomClickHandler}>
          Adicionar
        </FormButton>
      )}
    </CartCupomContainer>
  );
};

export default CartCupom;
