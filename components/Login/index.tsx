import React from "react";
import Link from 'next/link';

import Wrapper from "./styled";
import LoginActions from "./LoginActions";
import { LoginForm } from "@components/Forms";

const Login: React.FC = () => {
  return (
    <Wrapper>
      <img src="/images/logo.svg" alt="Logo do mordidela" />
      <p>
        Não possui conta? <Link href="/cadastro">Cadastre-se!</Link>
      </p>
      <LoginForm />
      <LoginActions />
    </Wrapper>
  );
};

export default Login;
