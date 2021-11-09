import React, { Fragment } from "react";
import { useRouter } from "next/router";

import UserDataActions from "./UserDataActions";
import { SignUpForm } from "@components/Forms";

type Props = {
  setIsAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserData: React.FC<Props> = (props) => {
  const router = useRouter();

  const nextHandler = () => {
    props.setIsAddressForm(true);
  };

  const backHandler = () => {
    router.push("/login");
  };

  return (
    <Fragment>
      <SignUpForm />
      <UserDataActions onBack={backHandler} onNext={nextHandler} />
    </Fragment>
  );
};

export default UserData;
