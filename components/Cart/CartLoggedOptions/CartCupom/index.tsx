import React, { useState } from "react";
import Axios from "@api";
import Cupom from "@models/cupom";
import { useFormikContext } from "formik";
import { FormButton } from "@components/shared";
import { cupomFormat } from "@utils/formatters";
import { CartFormValues } from "@components/Cart/FormModel";
import { CartCupomContainer, CartCupomInput } from "./styled";

const CartCupom: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<CartFormValues>();
  const [inputCupom, setInputCupom] = useState(cupomFormat(values.cupom?.codigo_cupom || ""));

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInputCupom(cupomFormat(event.target.value));
  }

  async function fetchCupom() {
    try {
      const response = await Axios.get<Cupom>(`/cupom?codigo=${inputCupom}`);
      if (response.data) {
        setFieldValue("cupom", {
          id_cupom: response.data.id_cupom,
          valor_desconto: response.data.valor_desconto,
          codigo_cupom: response.data.codigo,
          tipo_cupom: response.data.tipo,
        });
      }
    } catch (e) {
      const error = e as Error;
      console.log(error);
    }
  }

  function addCupomClickHandler() {
    fetchCupom();
  }

  return (
    <CartCupomContainer>
      <CartCupomInput
        type="text"
        placeholder="Digite aqui seu cupom"
        onChange={changeHandler}
        maxLength={20}
        value={inputCupom}
      />
      <FormButton type="button" onClick={addCupomClickHandler}>
        Adicionar
      </FormButton>
    </CartCupomContainer>
  );
};

export default CartCupom;
