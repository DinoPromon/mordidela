import React from "react";
import Link from "next/link";

import { SideBarListContainer } from "./styled";

type Props = {
  onClose: () => void;
};

const SideBarList: React.FC<Props> = (props) => {
  const { onClose } = props;

  return (
    <SideBarListContainer>
      <li>
        <Link href="/">
          <a onClick={onClose}>Início</a>
        </Link>
      </li>
      <li>
        <Link href="/cardapio">
          <a onClick={onClose}>Cardápio</a>
        </Link>
      </li>
      <li>Sobre</li>
    </SideBarListContainer>
  );
};

export default SideBarList;
