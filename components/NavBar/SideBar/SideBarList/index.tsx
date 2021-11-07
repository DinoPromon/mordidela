import React from "react";
import Link from 'next/link';

import Wrapper from "./styled";

const SideBarList: React.FC = () => {
  return (
    <Wrapper>
      <li>
        <Link href="/">Início</Link>
      </li>
      <li>
        <Link href="/cardapio">Cardápio</Link>
      </li>
      <li>Sobre</li>
    </Wrapper>
  );
};

export default SideBarList;
