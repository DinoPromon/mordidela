import type { ReactElement } from "react";

import Menu from "@components/Menu";
import { NavBarFooter } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";

const MenuPage: NextPageWithLayout = () => {
  return <Menu />;
};

MenuPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarFooter>{page}</NavBarFooter>;
};

export default MenuPage;
