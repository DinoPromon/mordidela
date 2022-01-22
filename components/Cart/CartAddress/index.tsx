import React, { Fragment, useContext } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Endereco from "@models/endereco";
import { useFormikContext } from "formik";
import { CartContext } from "@store/cart";
import { FaPlusCircle } from "react-icons/fa";
import { PURPLE } from "@utils/colors";
import {
  CartAddressContainer,
  CartAddAddress,
  CartAddressTitle,
  CartAddressComplement,
} from "./styled";
import { CartFormValues } from "../FormModel";

type CartAddressProps = {
  addresses: Endereco[];
};

const CartAddress: React.FC<CartAddressProps> = ({ addresses }) => {
  const { setFieldValue } = useFormikContext<CartFormValues>();
  const { setAddressId, order } = useContext(CartContext);

  function getFormatedAddress(address: Endereco) {
    return `${address.logradouro} n° ${address.numero}, ${address.bairro}`;
  }

  function changeRadioHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const addressId = Number(event.target.value);
    setAddressId(addressId);
    setFieldValue("address_id", addressId);
  }

  return (
    <CartAddressContainer>
      <CartAddressTitle>Endereços de entrega</CartAddressTitle>
      <RadioGroup name="address-input-radio" value={order.address_id} onChange={changeRadioHandler}>
        {addresses.length > 0 &&
          addresses.map((address) => (
            <FormControlLabel
              label={
                <Fragment>
                  <p>{getFormatedAddress(address)}</p>
                  <CartAddressComplement>Complemento: {address.complemento}</CartAddressComplement>
                </Fragment>
              }
              key={`address-${address.id_endereco}`}
              value={address.id_endereco}
              control={<Radio color="secondary" />}
            />
          ))}
      </RadioGroup>
      <CartAddAddress>
        <FaPlusCircle size={14} color={PURPLE} />
        <p>Adicionar endereço</p>
      </CartAddAddress>
    </CartAddressContainer>
  );
};

export default CartAddress;
