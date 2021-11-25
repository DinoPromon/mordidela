import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import Wrapper from "./styled";
import { LoginForm } from "@components/Forms";
import { PINK } from "@utils/colors";

const Login: React.FC = () => {
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
      <LoginForm />
    </Wrapper>
  );
};

export default Login;
