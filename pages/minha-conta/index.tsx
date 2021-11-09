import type { ReactElement } from "react";

import Wrapper from "./styled";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// apenas layout/design

const AccountPage: NextPageWithLayout = () => {
  return (
    <Wrapper>
      <div>
        <div>
          <FontAwesomeIcon icon={faUser} size="5x" color="rgba(130, 53, 206, 1)" />
        </div>
        <h3>| Aristóteles da Silva |</h3>
        <button>Dados gerais</button>
        <button>Pedidos</button>
        <button>Cupons</button>
        <button>Endereços</button>
      </div>
    </Wrapper>
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export default AccountPage;
