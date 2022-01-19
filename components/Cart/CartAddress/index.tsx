import React, { Fragment } from "react";
import { useContext } from "react";
import { CartContext } from "@store/cart";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Endereco from "@models/endereco";
import { FaPlusCircle } from "react-icons/fa";
import { CartAddressContainer, CartAddAddress, CartAddressTitle, CartAddressComplement } from "./styled";
import { PURPLE } from "@utils/colors";

type CartAddressProps = {
  addresses: Endereco[];
};

const CartAddress: React.FC<CartAddressProps> = ({ addresses }) => {
  const { setAddressId, order } = useContext(CartContext);

  function getFormatedAddress(address: Endereco) {
    return `${address.logradouro} n° ${address.numero}, ${address.bairro}`;
  }

  function changeRadioHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setAddressId(event.target.value);
  }

  return (
    <CartAddressContainer>
      <CartAddressTitle>Endereços de entrega</CartAddressTitle>
      <FormControl>
        <RadioGroup name="order-addresses-radio-inputs" onChange={changeRadioHandler} value={order.address_id}>
          {addresses.length > 0 &&
            addresses.map((address) => (
              <FormControlLabel
                key={`address-${address.id_endereco}`}
                value={address.id_endereco}
                control={<Radio />}
                label={
                  <Fragment>
                    <p>{getFormatedAddress(address)}</p>
                    <CartAddressComplement>Complemento: {address.complemento}</CartAddressComplement>
                  </Fragment>
                }
              />
            ))}
          <CartAddAddress>
            <FaPlusCircle size={14} color={PURPLE} />
            <p>Adicionar endereço</p>
          </CartAddAddress>
        </RadioGroup>
      </FormControl>
    </CartAddressContainer>
  );
};

export default CartAddress;
