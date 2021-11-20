import { FormButton } from "@components/shared";
import React from "react";
import CartAdicionalDescription from "./CartAdicionalDescription";
import CartEntrega from "./CartEntrega";
import CartItemDescription from "./CartItemDescription";
import CartSubtotal from "./CartSubtotal";
import CartTipoEntrega from "./CartTipoEntrega";
import CartTotal from "./CartTotal";

import Wrapper from "./styled";

const Cart: React.FC = () => {
  return (
    <Wrapper>
      <h2>Seu pedido</h2>
      <CartTipoEntrega/>
      <CartItemDescription/>
      <CartAdicionalDescription/>
      <CartSubtotal/>
      <CartEntrega/>
      <CartTotal/>
      <div>
        <FormButton type="submit">Finalizar pedido</FormButton>

      </div>
    </Wrapper>
  );
};

export default Cart;
