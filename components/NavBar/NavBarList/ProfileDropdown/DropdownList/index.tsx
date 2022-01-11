import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/client";
import Link from "next/link";

import useComponentVisible from "@hooks/useComponenteVisible";

import {
  unmountAnimation,
  renderAnimation,
  DropdownListItem,
  DropdownListContainer,
  DROPDOWN_ANIMATION_TIME,
} from "./styled";

type Props = {
  isShowingDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
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
    <DropdownListContainer ref={dropdownRef as React.Ref<HTMLUListElement>} animation={dropdownAnimation}>
      <DropdownListItem>
        <Link href="/minha-conta">Minha conta</Link>
      </DropdownListItem>
      <DropdownListItem>
        <Link href="/pedidos">Pedidos</Link>
      </DropdownListItem>
      <DropdownListItem onClick={logoutHandler}>Sair</DropdownListItem>
    </DropdownListContainer>
  );
};

export default DropdownList;
