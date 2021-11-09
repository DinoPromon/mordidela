import React, { Fragment } from "react";

import AddressForm from "@components/Forms/AddressForm";
import Wrapper from "@components/Forms/styled";
import FormButton from "@components/shared/FormButton";

type Props = {
  setIsAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserAddress: React.FC<Props> = (props) => {
  const backHandler = () => {
    props.setIsAddressForm(false);
  };

  return (
    <Fragment>
      <AddressForm />
      <div>
        <FormButton onClick={backHandler}>Voltar</FormButton>
        <FormButton>Finalizar</FormButton>
      </div>
    </Fragment>
  );
};

export default UserAddress;
