import React from "react";
import Link from "next/link";

import ProductsDropdown from "./ProductsDropdown";
import { NavBarAdminContainer, NavBarAdminListItem } from "./styled";

const NavBarAdmin: React.FC = () => {
  return (
    <NavBarAdminContainer>
      <Link passHref href="/admin/inicio">
        <NavBarAdminListItem>Início</NavBarAdminListItem>
      </Link>
      <Link passHref href="/admin/pedidos">
        <NavBarAdminListItem>Pedidos</NavBarAdminListItem>
      </Link>
      <ProductsDropdown>Produtos</ProductsDropdown>
      <Link passHref href="/admin/promocoes">
        <NavBarAdminListItem>Promoções</NavBarAdminListItem>
      </Link>
      <Link passHref href="/admin/cupons">
        <NavBarAdminListItem>Cupons</NavBarAdminListItem>
      </Link>
    </NavBarAdminContainer>
  );
};

export default NavBarAdmin;
