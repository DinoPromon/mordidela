import { Fragment } from "react";
import type { ReactElement } from 'react';

import MenuHeader from "@components/Menu/MenuHeader";
import MenuList from "@components/Menu/MenuList";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";

const MenuPage: NextPageWithLayout = () => {
  return (
    <Fragment>
      <MenuHeader />
      <MenuList />
    </Fragment>
  );
};

MenuPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};


export default MenuPage;
