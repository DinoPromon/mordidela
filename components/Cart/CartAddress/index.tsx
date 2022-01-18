import React, { Fragment } from "react";
import { useContext } from "react";
import { CartContext } from "@store/cart";
import Endereco from "@models/endereco";
import { InputRadio } from "@components/shared";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartAddressContainer, CartAddAddress, CartAddressTitle, CartAddressComplement } from "./styled";
import { PURPLE } from "@utils/colors";

type CartAddressProps = {
  addresses: Endereco[];
};

const CartAddress: React.FC<CartAddressProps> = ({ addresses }) => {
  const { setAddressId } = useContext(CartContext);

  function getFormatedAddress(address: Endereco) {
    return `${address.logradouro} n° ${address.numero}, ${address.bairro}`;
  }

  function setAddressById(addressId: Endereco["id_endereco"], event: React.ChangeEvent<HTMLInputElement>) {
    setAddressId(addressId);
  }

  return (
    <CartAddressContainer>
      <CartAddressTitle>Endereços de entrega</CartAddressTitle>
      {addresses.length > 0 &&
        addresses.map((address) => (
          <Fragment key={`address-${address.id_endereco}`}>
            <InputRadio
              id="teste-input-radio"
              defaultCheked={false}
              name="teste-input-name"
              value={1}
              onChange={setAddressById.bind(null, address.id_endereco)}
            >
              <Fragment>
                <p>{getFormatedAddress(address)}</p>
              </Fragment>
            </InputRadio>
            <CartAddressComplement>Complemento: {address.complemento}</CartAddressComplement>
            <CartAddAddress>
              <FontAwesomeIcon icon={faPlusCircle} size="sm" color={PURPLE} />
              <p>Adicionar endereço</p>
            </CartAddAddress>
          </Fragment>
        ))}
    </CartAddressContainer>
  );
};

export default CartAddress;
