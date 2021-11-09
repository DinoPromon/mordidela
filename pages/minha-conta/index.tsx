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
<<<<<<< HEAD
          <FontAwesomeIcon icon={faUser} size="7x" color={PURPLE} />
=======
          <FontAwesomeIcon icon={faUser} size="5x" color="rgba(130, 53, 206, 1)" />
>>>>>>> 591236d7c9e488b97652018748b003a7cb505e2a
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
