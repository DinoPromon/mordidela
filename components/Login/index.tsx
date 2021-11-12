import React, { useState } from "react";
import Link from "next/link";

import Wrapper from "./styled";
import { LoginForm } from "@components/Forms";
import { LoginFormData } from "@my-types/login";

const initialLoginData: LoginFormData = Object.freeze({
  email: "",
  senha: "",
});

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginFormData>(initialLoginData);


  return (
    <Wrapper>
      <img src="/images/logo.svg" alt="Logo do mordidela" />
      <p>
        Não possui conta? <Link href="/cadastro">Cadastre-se!</Link>
      </p>
      <LoginForm state={loginData} setState={setLoginData}/>
    </Wrapper>
  );
};

export default Login;
