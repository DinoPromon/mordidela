import Image from "next/image";
import type { NextPage } from "next";

import Wrapper from "./styled";

// apenas layout/design

const AccountPage: NextPage = () => {
  return (
    <Wrapper>
      <Image src="" alt="Logo de usuário" width={200} height={200} layout="responsive" />
      <h3>Aristóteles da Silva</h3>
      <h4>Dados gerais</h4>
      <h4>Pedidos</h4>
      <h4>Cupons</h4>
      <h4>Endereços</h4>
    </Wrapper>
  );
};

export default AccountPage;
