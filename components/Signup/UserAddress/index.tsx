import React, { Fragment } from "react";

import { AddressForm } from "@components/Forms";
import UserAddressActions from "./UserAddressActions";

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
      <UserAddressActions onBack={backHandler} />
    </Fragment>
  );
};

export default UserAddress;
