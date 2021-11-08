import type { ReactElement } from "react";

import Wrapper from "./styled";
import NavFooter from "@components/NavFooter";
import { NextPageWithLayout } from "@my-types/next-page";

// apenas layout/design

const AccountPage: NextPageWithLayout = () => {
  return (
    <Wrapper>
      <img src="" alt="Logo de usuário" />
      <h3>Aristóteles da Silva</h3>
      <h4>Dados gerais</h4>
      <h4>Pedidos</h4>
      <h4>Cupons</h4>
      <h4>Endereços</h4>
    </Wrapper>
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <NavFooter>{page}</NavFooter>;
};

export default AccountPage;
