import React, { Fragment, useEffect } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Endereco from "@models/endereco";
import { useContext } from "react";
import { CartContext } from "@store/cart";
import { FaPlusCircle } from "react-icons/fa";
import { PURPLE } from "@utils/colors";
import {
  CartAddressContainer,
  CartAddAddress,
  CartAddressTitle,
  CartAddressComplement,
} from "./styled";

type CartAddressProps = {
  selectedAddressId: number | null;
  addresses: Endereco[];
  onSetAddressId: (addressId: number) => void;
};

const CartAddress: React.FC<CartAddressProps> = ({
  addresses,
  onSetAddressId,
  selectedAddressId,
}) => {
  const { setAddressId } = useContext(CartContext);

  function getFormatedAddress(address: Endereco) {
    return `${address.logradouro} n° ${address.numero}, ${address.bairro}`;
  }

  function changeRadioHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const addressId = Number(event.target.value);
    onSetAddressId(addressId);
  }

  useEffect(() => {
    setAddressId(selectedAddressId);
  }, [selectedAddressId, setAddressId]);

  return (
    <CartAddressContainer>
      <CartAddressTitle>Endereços de entrega</CartAddressTitle>
      <RadioGroup
        name="address-input-radio"
        value={selectedAddressId}
        onChange={changeRadioHandler}
      >
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
