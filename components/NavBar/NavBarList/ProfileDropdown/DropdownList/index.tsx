import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { Autorizacao } from "@models/usuario";

import useComponentVisible from "@hooks/useComponenteVisible";

import {
  unmountAnimation,
  renderAnimation,
  DropdownListItem,
  DropdownListContainer,
  DROPDOWN_ANIMATION_TIME,
} from "./styled";

import type { Session } from "next-auth";

type Props = {
  isShowingDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session;
};

const DropdownList: React.FC<Props> = (props) => {
  const [dropdownAnimation, setDropdownAnimation] = useState(renderAnimation);
  const { isShowingDropdown, setShowDropdown } = props;

  const { ref: dropdownRef, isComponentVisible } = useComponentVisible(isShowingDropdown);

  const logoutHandler = () => {
    signOut();
  };

  useEffect(() => {
    setDropdownAnimation(isComponentVisible ? renderAnimation : unmountAnimation);
    const timer = setTimeout(() => {
      setShowDropdown(isComponentVisible);
    }, DROPDOWN_ANIMATION_TIME);

    return () => clearTimeout(timer);
  }, [isComponentVisible, setShowDropdown]);

  return (
    <DropdownListContainer
      ref={dropdownRef as React.Ref<HTMLUListElement>}
      animation={dropdownAnimation}
    >
      {props.session.user.autorizacao === Autorizacao.ADMIN && (
        <DropdownListItem>
          <Link href="/admin/pedidos">Administrador</Link>
        </DropdownListItem>
      )}
      <DropdownListItem>
        <Link href="/dados-gerais">Dados gerais</Link>
      </DropdownListItem>
      <DropdownListItem>
        <Link href="/enderecos">Endereços</Link>
      </DropdownListItem>
      <DropdownListItem>
        <Link href="/pedidos">Pedidos</Link>
      </DropdownListItem>
      <DropdownListItem>
        <Link href="/cupons">Cupons</Link>
      </DropdownListItem>
      <DropdownListItem onClick={logoutHandler}>Sair</DropdownListItem>
    </DropdownListContainer>
  );
};

export default DropdownList;
