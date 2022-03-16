import React from "react";
import type { ReactElement } from "react";

import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import Categories from "@components/Admin/Categories";

const ProductsPage: NextPageWithLayout = () => {
  return <Categories></Categories>;
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default ProductsPage;