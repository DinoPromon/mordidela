import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi/index";

import LoginForm from "./LoginForm";
import { PINK } from "@utils/colors";
import { LoginContainer } from "./styled";

const Login: React.FC = () => {
  const router = useRouter();

  const backHandler = () => {
    router.push("/");
  };

  return (
    <LoginContainer>
      <span onClick={backHandler}>
        <FiArrowLeft size={30} color={PINK} />
      </span>
      <img src="/images/logo.svg" alt="Logo do mordidela" />
      <p>
        Não possui conta? <Link href="/cadastro">Cadastre-se!</Link>
      </p>
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
