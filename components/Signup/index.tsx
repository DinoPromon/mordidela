import React, { useState } from "react";
import { useRouter } from "next/router";

import Wrapper from "./styled";
import { AddressForm, SignUpForm } from "@components/Forms";
import { UserFormData, AddressFormData } from "@my-types/signup";

const Signup: React.FC = () => {
  const [isAddressForm, setIsAddresForm] = useState(false);
  const router = useRouter();

  const sendRequest = async () => {
    const userData: UserFormData = {
      nome: "Aristóteles",
      data_nasciemnto: "1998/10/12",
      email: "aristoteles@gmail.com",
      senha: "aristoteles123",
      senha_confirmada: "aristoteles123",
      telefone: "44998345678",
    };

    const addressData: AddressFormData = {
      bairro: "Jardim encantado",
      complemento: "Morro",
      logradouro: "Rua Distante",
      numero: "45",
    };

    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        userData,
        addressData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const addressFormNextHandler = () => {
    console.log("todo");
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
        <AddressForm onNext={addressFormNextHandler} onBack={addressFormBackHandler} />
      ) : (
        <SignUpForm onNext={signupFormNextHandler} onBack={signupFormBackHandler} />
      )}
    </Wrapper>
  );
};

export default Signup;
