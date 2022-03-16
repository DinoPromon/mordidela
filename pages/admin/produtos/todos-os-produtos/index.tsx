import React from "react";
import type { ReactElement } from "react";

import { NavBarAdmin } from "@components/Layouts";
import { NextPageWithLayout } from "@my-types/next-page";
import AllProducts from "@components/Admin/AllProducts";

const ProductsPage: NextPageWithLayout = () => {
  return <AllProducts></AllProducts>;
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavBarAdmin>{page}</NavBarAdmin>;
};

export default ProductsPage;