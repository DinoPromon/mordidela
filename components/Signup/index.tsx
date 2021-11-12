import React, { useState } from "react";
import { useRouter } from "next/router";

import Wrapper from "./styled";
import { AddressForm, SignUpForm } from "@components/Forms";
import { UserFormData, AddressFormData } from "@my-types/signup";

const signupInitialState: UserFormData = Object.freeze({
  nome: "",
  data_nascimento: "",
  email: "",
  senha: "",
  senha_confirmada: "",
  telefone: "",
});

const addressInitialState: AddressFormData = Object.freeze({
  logradouro: "",
  numero: "",
  bairro: "",
  complemento: "",
});

const Signup: React.FC = () => {
  const router = useRouter();
  const [isAddressForm, setIsAddresForm] = useState(false);
  const [signupFormData, setSignupFormData] = useState<UserFormData>(signupInitialState);
  const [addressFormData, setAddressFormData] = useState<AddressFormData>(addressInitialState);

  const sendRequest = async () => {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        userData: signupFormData,
        addressData: addressFormData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const addressFormBackHandler = () => {
    setIsAddresForm(false);
  };

  const signupFormNextHandler = () => {
    setIsAddresForm(true);
  };

  const signupFormBackHandler = () => {
    router.back();
  };

  return (
    <Wrapper>
      <img
        src={isAddressForm ? "/images/address.svg" : "/images/profile_pic.svg"}
        alt="Ícone de criação de perfil."
      />
      {isAddressForm ? (
        <AddressForm
          onSubmit={sendRequest}
          onBack={addressFormBackHandler}
          state={addressFormData}
          setState={setAddressFormData}
        />
      ) : (
        <SignUpForm
          state={signupFormData}
          setState={setSignupFormData}
          onSubmit={signupFormNextHandler}
          onBack={signupFormBackHandler}
        />
      )}
    </Wrapper>
  );
};

export default Signup;
