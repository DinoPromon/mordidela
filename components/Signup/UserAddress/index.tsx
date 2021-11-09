import React, { Fragment } from "react";

import { AddressForm } from "@components/Forms";
import UserAddressActions from "./UserAddressActions";

type Props = {
  setIsAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
  sendRequest: () => void
};

const UserAddress: React.FC<Props> = (props) => {
  const backHandler = () => {
    props.setIsAddressForm(false);
  };

  const submitHandler = () => {
    props.sendRequest();
  }

  return (
    <Fragment>
      <AddressForm />
      <UserAddressActions onBack={backHandler} onSubmit={submitHandler}/>
    </Fragment>
  );
};

export default UserAddress;
