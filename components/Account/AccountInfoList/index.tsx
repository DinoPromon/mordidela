import React from "react";

import CustomList from "./styled";
import { ProfileModalContent } from "@my-types/profile";

type Props = {
  onChangeModal: (content: ProfileModalContent) => void;
};

const AccountInfoList: React.FC<Props> = (props) => {
  const { onChangeModal } = props;

  return (
    <CustomList>
      <li>
        <button onClick={onChangeModal.bind(null, "generalData")}>Dados gerais</button>
      </li>
      <li>
        <button>Endereços</button>
      </li>
      <li>
        <button onClick={onChangeModal.bind(null, "order")}>Pedidos</button>
      </li>
      <li>
        <button>Cupons</button>
      </li>
    </CustomList>
  );
};

export default AccountInfoList;
