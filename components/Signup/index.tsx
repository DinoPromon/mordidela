import React, { useState } from "react";

import Wrapper from "./styled";
import UserAddress from "./UserAddress";
import UserData from "./UserData";

const Signup: React.FC = () => {
  const [isAddressForm, setIsAddresForm] = useState(false);

  return (
    <Wrapper>
      <img
        src={isAddressForm ? "/images/address.svg" : "/images/profile_pic.svg"}
        alt="Ícone de criação de perfil."
      />
      {isAddressForm ? (
        <UserAddress setIsAddressForm={setIsAddresForm} />
      ) : (
        <UserData setIsAddressForm={setIsAddresForm} />
      )}
    </Wrapper>
  );
};

export default Signup;
