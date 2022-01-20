import React, { Fragment } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { radioStyles } from "@components/shared/CustomMui";
import Endereco from "@models/endereco";
import { useContext } from "react";
import { CartContext } from "@store/cart";
import { FaPlusCircle } from "react-icons/fa";
import { PURPLE } from "@utils/colors";
import { CartAddressContainer, CartAddAddress, CartAddressTitle, CartAddressComplement } from "./styled";

type CartAddressProps = {
  addresses: Endereco[];
};

const CartAddress: React.FC<CartAddressProps> = ({ addresses }) => {
  const radioClasses = radioStyles();
  const { setAddressId, order } = useContext(CartContext);

  function getFormatedAddress(address: Endereco) {
    return `${address.logradouro} n° ${address.numero}, ${address.bairro}`;
  }

  function changeRadioHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setAddressId(Number(event.target.value));
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
              control={<Radio classes={radioClasses} />}
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
