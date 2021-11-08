import React, { useEffect, useState } from "react";
import Link from "next/link";

import useComponentVisible from "@hooks/useComponenteVisible";

import Wrapper, { unmountAnimation, renderAnimation, DROPDOWN_ANIMATION_TIME } from "./styled";

type Props = {
  isShowingDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownList: React.FC<Props> = (props) => {
  const [dropdownAnimation, setDropdownAnimation] = useState(renderAnimation);
  const { isShowingDropdown, setShowDropdown } = props;

  const { ref: dropdownRef, isComponentVisible } = useComponentVisible(isShowingDropdown);

  useEffect(() => {
    setDropdownAnimation(isComponentVisible ? renderAnimation : unmountAnimation);
    const timer = setTimeout(() => {
      setShowDropdown(isComponentVisible);
    }, DROPDOWN_ANIMATION_TIME);

    return () => clearTimeout(timer);
  }, [isComponentVisible, setShowDropdown]);

  return (
    <Wrapper ref={dropdownRef as React.Ref<HTMLUListElement>} animation={dropdownAnimation}>
      <li>
        <Link href="/minha-conta">Minha conta</Link>
      </li>
      <li>Pedidos</li>
      <li>Sair</li>
    </Wrapper>
  );
};

export default DropdownList;
