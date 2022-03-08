import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";
import { useFormikContext } from "formik";

import Axios from "@api";
import { cupomFormat } from "@utils/formatters";
import { RequestState } from "@my-types/request";
import { CartFadeVariant } from "@components/Cart/animations";
import { ErrorMessage } from "@components/shared/StyledComponents";
import { ErrorMessageContainer } from "@components/Login/LoginForm/styled";

import { CartCupomContainer, CartCupomInputButton, CartCupomError } from "./styled";

import type ICupom from "@models/cupom";
import type { AxiosError } from "axios";
import type { CartFormValues } from "@components/Cart/FormModel";

type CartCupomProps = {
  requestStatus: RequestState;
  onChangeRequestStatus: (status: Partial<RequestState>) => void;
};

const CartCupom: React.FC<CartCupomProps> = ({ onChangeRequestStatus, requestStatus }) => {
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
    <CartCupomContainer
      as={motion.div}
      variants={CartFadeVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <CartCupomInputButton>
        <TextField
          type="text"
          placeholder="Digite aqui seu cupom"
          onChange={couponCodeChangeHandler}
          value={inputCupom}
          variant="outlined"
          size="small"
          autoComplete="off"
          style={{ width: "clamp(200px, 350px, 100%)" }}
          inputProps={{ style: { textAlign: "center" } }}
        />
        {isLoadingCupom ? (
          <CircularProgress size={30} />
        ) : (
          <Button variant="contained" color="secondary" onClick={addCupomClickHandler}>
            Adicionar
          </Button>
        )}
      </CartCupomInputButton>
      <CartCupomError>
        <ErrorMessageContainer>
          {requestStatus.error && <ErrorMessage>{requestStatus.error}</ErrorMessage>}
        </ErrorMessageContainer>
      </CartCupomError>
    </CartCupomContainer>
  );
};

export default CartCupom;
