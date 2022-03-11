import Link from "next/link";
import React from "react";
import { NavBarAdminContainer, NavBarAdminListItem } from "./styled";

const NavBarAdmin: React.FC = () => {
  return (
    <NavBarAdminContainer>
      <Link href={"/admin-inicio"}>
        <NavBarAdminListItem>Início</NavBarAdminListItem>
      </Link>
      <Link href={"/admin-pedidos"}>
        <NavBarAdminListItem>Pedidos</NavBarAdminListItem>
      </Link>
      <Link href={"/admin-produtos"}>
        <NavBarAdminListItem>Produtos</NavBarAdminListItem>
      </Link>
      <Link href={"/admin-promocoes"}>
        <NavBarAdminListItem>Promoções</NavBarAdminListItem>
      </Link>
      <Link href={"/admin-cupons"}>
        <NavBarAdminListItem>Cupons</NavBarAdminListItem>
      </Link>
    </NavBarAdminContainer>
  );
};

export default NavBarAdmin;
