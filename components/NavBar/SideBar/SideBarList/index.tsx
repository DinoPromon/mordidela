import React from "react";
import Link from "next/link";

import Wrapper from "./styled";

type Props = {
  onClose: () => void;
};

const SideBarList: React.FC<Props> = (props) => {
  const { onClose } = props;

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default SideBarList;
