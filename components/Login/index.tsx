import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi/index";

import LoginForm from "./LoginForm";
import { PINK } from "@utils/colors";
import { LoginContainer, LoginContainerArrowLeft, LoginImage, LoginRegister, LoginNotHaveAccount } from "./styled";

const Login: React.FC = () => {
  const router = useRouter();

  const backHandler = () => {
    router.push("/");
  };

  return (
    <LoginContainer>
      <LoginContainerArrowLeft onClick={backHandler}>
        <FiArrowLeft size={30} color={PINK} />
      </LoginContainerArrowLeft>
      <LoginImage>
        <Image src={"/images/logo.svg"} width={200} height={150} alt="Logo do mordidela"></Image>
      </LoginImage>
      <LoginNotHaveAccount>
        Não possui conta? <LoginRegister href="/cadastro">Cadastre-se!</LoginRegister>
      </LoginNotHaveAccount>
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
