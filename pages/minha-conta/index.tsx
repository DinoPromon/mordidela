import type { ReactElement } from "react";

import Wrapper from "./styled";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PURPLE } from "@utils/colors";

// apenas layout/design

const AccountPage: NextPageWithLayout = () => {
  return (
    <Wrapper>
      <div>
        <div>
          <FontAwesomeIcon icon={faUser} size="7x" color={PURPLE} />
        </div>
        <h3>| Aristóteles da Silva |</h3>
        <h4>Dados gerais</h4>
        <h4>Pedidos</h4>
        <h4>Cupons</h4>
        <h4>Endereços</h4>
      </div>
    </Wrapper>
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export default AccountPage;
