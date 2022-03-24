import React, { useEffect, useState } from "react";
import Link from "next/link";

import useComponentVisible from "@hooks/useComponenteVisible";

import {
  unmountAnimation,
  renderAnimation,
  DROPDOWN_ANIMATION_TIME,
} from "@components/NavBar/NavBarList/ProfileDropdown/DropdownList/styled";

import { ProductsDropdownListContainer, ProductsDropdownListItem } from "./styled";

type Props = {
  isShowingDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductsDropdownList: React.FC<Props> = (props) => {
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
    <ProductsDropdownListContainer
      ref={dropdownRef as React.Ref<HTMLUListElement>}
      animation={dropdownAnimation}
    >
      <ProductsDropdownListItem>
        <Link href="/admin/produtos">Todos os produtos</Link>
      </ProductsDropdownListItem>
      <ProductsDropdownListItem>
        <Link href="/admin/produtos/adicionar">Adicionar produto</Link>
      </ProductsDropdownListItem>
      <ProductsDropdownListItem>
        <Link href="/admin/produtos/editar">Editar produto</Link>
      </ProductsDropdownListItem>
      <ProductsDropdownListItem>
        <Link href="/admin/produtos/adicionais">Adicionais</Link>
      </ProductsDropdownListItem>
      <ProductsDropdownListItem>
        <Link href="/admin/produtos/sabores">Sabores</Link>
      </ProductsDropdownListItem>
      <ProductsDropdownListItem>
        <Link href="/admin/produtos/categorias">Categorias</Link>
      </ProductsDropdownListItem>
    </ProductsDropdownListContainer>
  );
};

export default ProductsDropdownList;
