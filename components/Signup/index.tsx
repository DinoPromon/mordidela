import React, { useState } from "react";
import { useRouter } from "next/router";

import Wrapper from "./styled";
import { AddressForm, SignUpForm } from "@components/Forms";
import { userFormValidation, getErrorMessage } from "./utils";
import { UserFormData, AddressFormData } from "@my-types/signup";

const initialState = Object.freeze({
  nome: "",
  data_nascimento: "",
  email: "",
  senha: "",
  senha_confirmada: "",
  telefone: "",
});

const Signup: React.FC = () => {
  const router = useRouter();
  const [isAddressForm, setIsAddresForm] = useState(false);
  const [formData, setFormData] = useState<UserFormData>(initialState);
  const [errorMessage, setErrorMessage] = useState("");

  const hasErrorInInputs = () => {
    for(let k in userFormValidation) {
      const key = k as keyof UserFormData;
      const isValid = userFormValidation[key](formData[key]);
      console.log(key, isValid);
      if(!isValid) return key;
    }
  }

  const sendRequest = async () => {
    // await fetch("/api/auth/signup", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     userData,
    //     addressData,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  const addressFormNextHandler = () => {
    console.log("todo");
  };

  const addressFormBackHandler = () => {
    setIsAddresForm(false);
  };

  const signupFormNextHandler = () => {
    const errorInput = hasErrorInInputs();
    if(errorInput){
      setErrorMessage(getErrorMessage(errorInput));
      return;
    }
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
        <SignUpForm
          state={formData}
          setState={setFormData}
          onNext={signupFormNextHandler}
          onBack={signupFormBackHandler}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </Wrapper>
  );
};

export default Signup;
