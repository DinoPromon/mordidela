import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";

import Wrapper from "./styled";
import { LoginForm } from "@components/Forms";
import { LoginFormData } from "@my-types/login";
import { PINK } from "@utils/colors";

const initialLoginData: LoginFormData = Object.freeze({
  email: "",
  senha: "",
});

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginFormData>(initialLoginData);
  const router = useRouter();

  const backHandler = () => {
    router.push("/");
  };

  return (
    <Wrapper>
      <span onClick={backHandler}>
        <FontAwesomeIcon icon={faArrowLeft} color={PINK} size="lg" />
      </span>
      <img src="/images/logo.svg" alt="Logo do mordidela" />
      <p>
        Não possui conta? <Link href="/cadastro">Cadastre-se!</Link>
      </p>
      <LoginForm state={loginData} setState={setLoginData} />
    </Wrapper>
  );
};

export default Login;
