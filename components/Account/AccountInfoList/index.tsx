import React from "react";

import CustomList from "./styled";

type Props = {
  onClick: () => void;
};

const AccountInfoList: React.FC<Props> = (props) => {
  const { onClick: openModalHandler } = props;

  return (
    <CustomList>
      <li>
        <button onClick={openModalHandler}>Dados gerais</button>
      </li>
      <li>
        <button>Endereços</button>
      </li>
      <li>
        <button>Pedidos</button>
      </li>
      <li>
        <button>Cupons</button>
      </li>
    </CustomList>
  );
};

export default AccountInfoList;
